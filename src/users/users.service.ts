import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import { User } from './user.model';
import { Role } from '../roles/role.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
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

  private async getRoleOrThrow(roleName?: string) {
    const normalized = (roleName || 'user').toLowerCase();
    if (normalized !== 'admin' && normalized !== 'user') {
      throw new HttpException('Invalid role', HttpStatus.BAD_REQUEST);
    }

    await this.ensureDefaultRoles();
    const role = await this.roleModel.findOne({ where: { name: normalized } });
    if (!role) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }

    return role;
  }

  async findAll() {
    try {
      const users = await this.userModel.findAll({
        include: [
          {
            model: Role,
            through: { attributes: [] },
          },
        ],
        order: [['createdAt', 'DESC']],
      });

      return users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.roles?.[0]?.name || 'user',
        createdAt: user.createdAt,
      }));
    } catch (error) {
      throw new HttpException(
        'Failed to fetch users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(dto: CreateUserDto) {
    try {
      const existing = await this.userModel.findOne({
        where: { email: dto.email },
      });
      if (existing) {
        throw new HttpException('Email already exists', HttpStatus.CONFLICT);
      }

      const role = await this.getRoleOrThrow(dto.role);
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(dto.password, salt);

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
        createdAt: user.createdAt,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'Failed to create user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, dto: UpdateUserDto) {
    try {
      const user = await this.userModel.findByPk(id, {
        include: [
          {
            model: Role,
            through: { attributes: [] },
          },
        ],
      });

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      if (dto.email) {
        const existing = await this.userModel.findOne({
          where: { email: dto.email, id: { [Op.ne]: id } },
        });
        if (existing) {
          throw new HttpException('Email already exists', HttpStatus.CONFLICT);
        }
      }

      if (dto.name) {
        user.name = dto.name;
      }
      if (dto.email) {
        user.email = dto.email;
      }
      if (dto.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(dto.password, salt);
      }

      await user.save();

      if (dto.role) {
        const role = await this.getRoleOrThrow(dto.role);
        await user.$set('roles', [role]);
      }

      const roleName = dto.role || user.roles?.[0]?.name || 'user';

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: roleName,
        createdAt: user.createdAt,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'Failed to update user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {
      const user = await this.userModel.findByPk(id);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      await user.destroy();
      return { message: 'User deleted successfully' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'Failed to delete user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
