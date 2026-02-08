import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { Employee } from './employee.model';
import { Site } from '../sites/site.model';

@Module({
  imports: [SequelizeModule.forFeature([Employee, Site])],
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule {}
