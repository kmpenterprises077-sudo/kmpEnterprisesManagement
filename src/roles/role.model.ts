import {
  Table,
  Column,
  Model,
  DataType,
  Unique,
  AllowNull,
  BelongsToMany,
} from 'sequelize-typescript';
import { User } from '../users/user.model';
import { UserRole } from './user-role.model';

export interface RoleCreationAttributes {
  name: string;
}

@Table({
  tableName: 'roles',
  timestamps: false,
})
export class Role extends Model<Role, RoleCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Unique
  @AllowNull(false)
  @Column({
    type: DataType.STRING(30),
  })
  declare name: string;

  @BelongsToMany(() => User, () => UserRole)
  declare users?: User[];
}
