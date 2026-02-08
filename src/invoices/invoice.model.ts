import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  ForeignKey,
} from 'sequelize-typescript';
import { Employee } from '../employees/employee.model';
import { Site } from '../sites/site.model';

export interface InvoiceCreationAttributes {
  type: string;
  employeeId?: number | null;
  siteId?: number | null;
  dateRange: string;
  amount: number;
  status: string;
  generatedDate: string;
  paidDate?: string | null;
  details?: any;
}

@Table({
  tableName: 'invoices',
  timestamps: true,
})
export class Invoice extends Model<Invoice, InvoiceCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(20),
  })
  declare type: string;

  @AllowNull(true)
  @ForeignKey(() => Employee)
  @Column({
    type: DataType.INTEGER,
  })
  declare employeeId: number | null;

  @AllowNull(true)
  @ForeignKey(() => Site)
  @Column({
    type: DataType.INTEGER,
  })
  declare siteId: number | null;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(60),
  })
  declare dateRange: string;

  @AllowNull(false)
  @Column({
    type: DataType.DECIMAL(12, 2),
  })
  declare amount: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(20),
  })
  declare status: string;

  @AllowNull(false)
  @Column({
    type: DataType.DATEONLY,
  })
  declare generatedDate: string;

  @AllowNull(true)
  @Column({
    type: DataType.DATEONLY,
  })
  declare paidDate: string | null;

  @AllowNull(true)
  @Column({
    type: DataType.JSON,
  })
  declare details: any | null;
}
