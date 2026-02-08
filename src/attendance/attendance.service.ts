import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Attendance } from './attendance.model';
import { Employee } from '../employees/employee.model';
import { Site } from '../sites/site.model';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectModel(Attendance) private readonly attendanceModel: typeof Attendance,
    @InjectModel(Employee) private readonly employeeModel: typeof Employee,
    @InjectModel(Site) private readonly siteModel: typeof Site,
  ) {}

  async findAll() {
    try {
      const records = await this.attendanceModel.findAll({
        include: [{ model: Employee }, { model: Site }],
        order: [['date', 'DESC']],
      });

      return records.map((rec) => ({
        id: rec.id,
        date: rec.date,
        status: rec.status,
        dayType: rec.dayType,
        employeeId: rec.employeeId,
        siteId: rec.siteId,
        employeeName: rec.employee?.name || null,
        siteName: rec.site?.name || null,
      }));
    } catch (error) {
      throw new HttpException(
        'Failed to fetch attendance',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(dto: CreateAttendanceDto) {
    try {
      const employee = await this.employeeModel.findByPk(dto.employeeId);
      if (!employee) {
        throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
      }

      if (dto.siteId) {
        const site = await this.siteModel.findByPk(dto.siteId);
        if (!site) {
          throw new HttpException('Site not found', HttpStatus.NOT_FOUND);
        }
      }

      const record = await this.attendanceModel.create({
        date: dto.date,
        status: dto.status,
        dayType: dto.dayType || 'Full',
        employeeId: dto.employeeId,
        siteId: dto.siteId ?? null,
      });

      return {
        id: record.id,
        date: record.date,
        status: record.status,
        dayType: record.dayType,
        employeeId: record.employeeId,
        siteId: record.siteId,
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Failed to create attendance',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, dto: UpdateAttendanceDto) {
    try {
      const record = await this.attendanceModel.findByPk(id);
      if (!record) {
        throw new HttpException('Attendance not found', HttpStatus.NOT_FOUND);
      }

      if (dto.employeeId !== undefined) {
        const employee = await this.employeeModel.findByPk(dto.employeeId);
        if (!employee) {
          throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
        }
        record.employeeId = dto.employeeId;
      }

      if (dto.siteId !== undefined) {
        const siteId = dto.siteId ?? null;
        if (siteId) {
          const site = await this.siteModel.findByPk(siteId);
          if (!site) {
            throw new HttpException('Site not found', HttpStatus.NOT_FOUND);
          }
        }
        record.siteId = siteId;
      }

      if (dto.date !== undefined) record.date = dto.date;
      if (dto.status !== undefined) record.status = dto.status;
      if (dto.dayType !== undefined) record.dayType = dto.dayType;

      await record.save();

      return {
        id: record.id,
        date: record.date,
        status: record.status,
        dayType: record.dayType,
        employeeId: record.employeeId,
        siteId: record.siteId,
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Failed to update attendance',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {
      const record = await this.attendanceModel.findByPk(id);
      if (!record) {
        throw new HttpException('Attendance not found', HttpStatus.NOT_FOUND);
      }

      await record.destroy();
      return { message: 'Attendance deleted successfully' };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Failed to delete attendance',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
