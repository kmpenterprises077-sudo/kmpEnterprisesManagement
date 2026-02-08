import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SalaryAdvancesController } from './salary-advances.controller';
import { SalaryAdvancesService } from './salary-advances.service';
import { SalaryAdvance } from './salary-advance.model';
import { Employee } from '../employees/employee.model';

@Module({
  imports: [SequelizeModule.forFeature([SalaryAdvance, Employee])],
  controllers: [SalaryAdvancesController],
  providers: [SalaryAdvancesService],
})
export class SalaryAdvancesModule {}
