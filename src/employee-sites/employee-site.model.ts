import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Employee } from '../employees/employee.model';
import { Site } from '../sites/site.model';

export interface EmployeeSiteCreationAttributes {
  employeeId: number;
  siteId: number;
  assignedAt?: Date;
}

@Table({
  tableName: 'employee_sites',
  timestamps: false,
})
export class EmployeeSite extends Model<
  EmployeeSite,
  EmployeeSiteCreationAttributes
> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @AllowNull(false)
  @ForeignKey(() => Employee)
  @Column({
    type: DataType.INTEGER,
  })
  declare employeeId: number;

  @AllowNull(false)
  @ForeignKey(() => Site)
  @Column({
    type: DataType.INTEGER,
  })
  declare siteId: number;

  @AllowNull(true)
  @Column({
    type: DataType.DATE,
  })
  declare assignedAt: Date | null;

  @BelongsTo(() => Employee)
  declare employee?: Employee;

  @BelongsTo(() => Site)
  declare site?: Site;
}
