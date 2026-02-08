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

export interface SalaryAdvanceCreationAttributes {
  employeeId: number;
  amount: number;
  date: string;
  note?: string;
}

@Table({
  tableName: 'salary_advances',
  timestamps: true,
})
export class SalaryAdvance extends Model<
  SalaryAdvance,
  SalaryAdvanceCreationAttributes
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
  @Column({
    type: DataType.INTEGER,
  })
  declare amount: number;

  @AllowNull(false)
  @Column({
    type: DataType.DATEONLY,
  })
  declare date: string;

  @AllowNull(true)
  @Column({
    type: DataType.STRING(200),
  })
  declare note: string | null;

  @BelongsTo(() => Employee)
  declare employee?: Employee;
}
