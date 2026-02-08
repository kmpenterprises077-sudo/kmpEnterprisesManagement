import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AttendanceController } from './attendance.controller';
import { AttendanceService } from './attendance.service';
import { Attendance } from './attendance.model';
import { Employee } from '../employees/employee.model';
import { Site } from '../sites/site.model';

@Module({
  imports: [SequelizeModule.forFeature([Attendance, Employee, Site])],
  controllers: [AttendanceController],
  providers: [AttendanceService],
})
export class AttendanceModule {}
