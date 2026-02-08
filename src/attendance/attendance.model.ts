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

export interface AttendanceCreationAttributes {
  date: string;
  status: string;
  dayType?: string;
  employeeId: number;
  siteId?: number | null;
}

@Table({
  tableName: 'attendance',
  timestamps: true,
})
export class Attendance extends Model<Attendance, AttendanceCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @AllowNull(false)
  @Column({
    type: DataType.DATEONLY,
  })
  declare date: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(30),
  })
  declare status: string;

  @AllowNull(true)
  @Column({
    type: DataType.STRING(20),
  })
  declare dayType: string | null;

  @AllowNull(false)
  @ForeignKey(() => Employee)
  @Column({
    type: DataType.INTEGER,
  })
  declare employeeId: number;

  @AllowNull(true)
  @ForeignKey(() => Site)
  @Column({
    type: DataType.INTEGER,
  })
  declare siteId: number | null;

  @BelongsTo(() => Employee)
  declare employee?: Employee;

  @BelongsTo(() => Site)
  declare site?: Site;
}
