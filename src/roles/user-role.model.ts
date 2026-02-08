import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from '../users/user.model';
import { Role } from './role.model';

@Table({
  tableName: 'user_roles',
  timestamps: false,
})
export class UserRole extends Model<UserRole> {
  @AllowNull(false)
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  declare userId: number;

  @AllowNull(false)
  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
  })
  declare roleId: number;
}
