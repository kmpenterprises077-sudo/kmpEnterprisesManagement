import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EmployeeSitesController } from './employee-sites.controller';
import { EmployeeSitesService } from './employee-sites.service';
import { EmployeeSite } from './employee-site.model';
import { Employee } from '../employees/employee.model';
import { Site } from '../sites/site.model';

@Module({
  imports: [SequelizeModule.forFeature([EmployeeSite, Employee, Site])],
  controllers: [EmployeeSitesController],
  providers: [EmployeeSitesService],
})
export class EmployeeSitesModule {}
