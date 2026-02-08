import { Table, Column, Model, DataType, AllowNull } from 'sequelize-typescript';

export interface EmployeeCreationAttributes {
  name: string;
  role: string;
  phone: string;
  dailySalary: number;
  aadharNumber?: string;
  dob?: string;
  address?: string;
  status?: string;
}

@Table({
  tableName: 'employees',
  timestamps: true,
})
export class Employee extends Model<Employee, EmployeeCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(120),
  })
  declare name: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(120),
  })
  declare role: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(30),
  })
  declare phone: string;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  declare dailySalary: number;

  @AllowNull(true)
  @Column({
    type: DataType.STRING(20),
  })
  declare aadharNumber: string | null;

  @AllowNull(true)
  @Column({
    type: DataType.DATEONLY,
  })
  declare dob: string | null;

  @AllowNull(true)
  @Column({
    type: DataType.STRING(255),
  })
  declare address: string | null;

  @AllowNull(true)
  @Column({
    type: DataType.STRING(30),
  })
  declare status: string | null;
}
