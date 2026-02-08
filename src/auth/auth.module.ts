import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from '../users/user.model';
import { Role } from '../roles/role.model';
import { UserRole } from '../roles/user-role.model';

@Module({
  imports: [SequelizeModule.forFeature([User, Role, UserRole])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
