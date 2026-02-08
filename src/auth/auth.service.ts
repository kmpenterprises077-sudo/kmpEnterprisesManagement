import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/user.model';
import { Role } from '../roles/role.model';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectModel(Role) private readonly roleModel: typeof Role,
  ) {}

  private async ensureDefaultRoles() {
    await this.roleModel.findOrCreate({
      where: { name: 'admin' },
      defaults: { name: 'admin' },
    });
    await this.roleModel.findOrCreate({
      where: { name: 'user' },
      defaults: { name: 'user' },
    });
  }

  async register(dto: RegisterDto) {
    try {
      await this.ensureDefaultRoles();

      const existing = await this.userModel.findOne({
        where: { email: dto.email },
      });

      if (existing) {
        throw new HttpException('Email already exists', HttpStatus.CONFLICT);
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(dto.password, salt);

      const roleName = (dto.role || 'user').toLowerCase();
      if (roleName !== 'admin' && roleName !== 'user') {
        throw new HttpException('Invalid role', HttpStatus.BAD_REQUEST);
      }

      const role = await this.roleModel.findOne({
        where: { name: roleName },
      });

      if (!role) {
        throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
      }

      const user = await this.userModel.create({
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
      });

      await user.$set('roles', [role]);

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: role.name,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'Failed to register user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(dto: LoginDto) {
    try {
      const user = await this.userModel.findOne({
        where: { email: dto.email },
        include: [
          {
            model: Role,
            through: { attributes: [] },
          },
        ],
      });

      if (!user) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }

      const isMatch = await bcrypt.compare(dto.password, user.password);
      if (!isMatch) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }

      const roleName = user.roles?.[0]?.name || 'user';

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: roleName,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'Failed to login',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
