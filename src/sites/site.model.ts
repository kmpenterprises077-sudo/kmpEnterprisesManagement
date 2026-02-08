import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
} from 'sequelize-typescript';

export interface SiteCreationAttributes {
  name: string;
  location?: string;
  manager?: string;
  company?: string;
  status?: string;
}

@Table({
  tableName: 'sites',
  timestamps: true,
})
export class Site extends Model<Site, SiteCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(150),
  })
  declare name: string;

  @AllowNull(true)
  @Column({
    type: DataType.STRING(200),
  })
  declare location: string | null;

  @AllowNull(true)
  @Column({
    type: DataType.STRING(120),
  })
  declare manager: string | null;

  @AllowNull(true)
  @Column({
    type: DataType.STRING(150),
  })
  declare company: string | null;

  @AllowNull(true)
  @Column({
    type: DataType.STRING(30),
  })
  declare status: string | null;

}
