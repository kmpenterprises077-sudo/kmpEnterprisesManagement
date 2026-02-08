import {
  Table,
  Column,
  Model,
  DataType,
  Unique,
  AllowNull,
  BelongsToMany,
} from 'sequelize-typescript';
import { Role } from '../roles/role.model';
import { UserRole } from '../roles/user-role.model';

export interface UserCreationAttributes {
  name: string;
  email: string;
  password: string;
}

@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends Model<User, UserCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(100),
  })
  declare name: string;

  @Unique
  @AllowNull(false)
  @Column({
    type: DataType.STRING(150),
  })
  declare email: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(255),
  })
  declare password: string;

  @BelongsToMany(() => Role, () => UserRole)
  declare roles?: Role[];
}
