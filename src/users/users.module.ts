import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.model';
import { Role } from '../roles/role.model';
import { UserRole } from '../roles/user-role.model';

@Module({
  imports: [SequelizeModule.forFeature([User, Role, UserRole])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
