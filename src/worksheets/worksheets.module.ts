import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { WorksheetsController } from './worksheets.controller';
import { WorksheetsService } from './worksheets.service';
import { Worksheet } from './worksheet.model';
import { Employee } from '../employees/employee.model';
import { Site } from '../sites/site.model';

@Module({
  imports: [SequelizeModule.forFeature([Worksheet, Employee, Site])],
  controllers: [WorksheetsController],
  providers: [WorksheetsService],
})
export class WorksheetsModule {}
