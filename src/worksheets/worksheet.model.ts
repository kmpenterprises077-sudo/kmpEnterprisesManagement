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

export interface WorksheetCreationAttributes {
  date: string;
  siteId: number;
  employeeId: number;
  description: string;
  workers?: number;
  supervisor?: string;
  status?: string;
}

@Table({
  tableName: 'worksheets',
  timestamps: true,
})
export class Worksheet extends Model<Worksheet, WorksheetCreationAttributes> {
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
  @ForeignKey(() => Site)
  @Column({
    type: DataType.INTEGER,
  })
  declare siteId: number;

  @AllowNull(false)
  @ForeignKey(() => Employee)
  @Column({
    type: DataType.INTEGER,
  })
  declare employeeId: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(400),
  })
  declare description: string;

  @AllowNull(true)
  @Column({
    type: DataType.INTEGER,
  })
  declare workers: number | null;

  @AllowNull(true)
  @Column({
    type: DataType.STRING(120),
  })
  declare supervisor: string | null;

  @AllowNull(true)
  @Column({
    type: DataType.STRING(30),
  })
  declare status: string | null;

  @BelongsTo(() => Site)
  declare site?: Site;

  @BelongsTo(() => Employee)
  declare employee?: Employee;
}
