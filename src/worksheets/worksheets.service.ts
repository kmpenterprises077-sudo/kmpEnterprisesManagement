import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Worksheet } from './worksheet.model';
import { Employee } from '../employees/employee.model';
import { Site } from '../sites/site.model';
import { CreateWorksheetDto } from './dto/create-worksheet.dto';
import { UpdateWorksheetDto } from './dto/update-worksheet.dto';

@Injectable()
export class WorksheetsService {
  constructor(
    @InjectModel(Worksheet) private readonly worksheetModel: typeof Worksheet,
    @InjectModel(Employee) private readonly employeeModel: typeof Employee,
    @InjectModel(Site) private readonly siteModel: typeof Site,
  ) {}

  async findAll() {
    try {
      const worksheets = await this.worksheetModel.findAll({
        include: [{ model: Employee }, { model: Site }],
        order: [['date', 'DESC']],
      });

      return worksheets.map((ws) => ({
        id: ws.id,
        date: ws.date,
        siteId: ws.siteId,
        employeeId: ws.employeeId,
        description: ws.description,
        workers: ws.workers,
        supervisor: ws.supervisor,
        status: ws.status,
        employeeName: ws.employee?.name || null,
        siteName: ws.site?.name || null,
      }));
    } catch (error) {
      throw new HttpException(
        'Failed to fetch worksheets',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(dto: CreateWorksheetDto) {
    try {
      const employee = await this.employeeModel.findByPk(dto.employeeId);
      if (!employee) {
        throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
      }

      const site = await this.siteModel.findByPk(dto.siteId);
      if (!site) {
        throw new HttpException('Site not found', HttpStatus.NOT_FOUND);
      }

      const worksheet = await this.worksheetModel.create({
        date: dto.date,
        siteId: dto.siteId,
        employeeId: dto.employeeId,
        description: dto.description,
        workers: dto.workers,
        supervisor: dto.supervisor,
        status: dto.status || 'Pending',
      });

      return {
        id: worksheet.id,
        date: worksheet.date,
        siteId: worksheet.siteId,
        employeeId: worksheet.employeeId,
        description: worksheet.description,
        workers: worksheet.workers,
        supervisor: worksheet.supervisor,
        status: worksheet.status,
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Failed to create worksheet',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, dto: UpdateWorksheetDto) {
    try {
      const worksheet = await this.worksheetModel.findByPk(id);
      if (!worksheet) {
        throw new HttpException('Worksheet not found', HttpStatus.NOT_FOUND);
      }

      if (dto.employeeId !== undefined) {
        const employee = await this.employeeModel.findByPk(dto.employeeId);
        if (!employee) {
          throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
        }
        worksheet.employeeId = dto.employeeId;
      }

      if (dto.siteId !== undefined) {
        const site = await this.siteModel.findByPk(dto.siteId);
        if (!site) {
          throw new HttpException('Site not found', HttpStatus.NOT_FOUND);
        }
        worksheet.siteId = dto.siteId;
      }

      if (dto.date !== undefined) worksheet.date = dto.date;
      if (dto.description !== undefined) worksheet.description = dto.description;
      if (dto.workers !== undefined) worksheet.workers = dto.workers;
      if (dto.supervisor !== undefined)
        worksheet.supervisor = dto.supervisor;
      if (dto.status !== undefined) worksheet.status = dto.status;

      await worksheet.save();

      return {
        id: worksheet.id,
        date: worksheet.date,
        siteId: worksheet.siteId,
        employeeId: worksheet.employeeId,
        description: worksheet.description,
        workers: worksheet.workers,
        supervisor: worksheet.supervisor,
        status: worksheet.status,
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Failed to update worksheet',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {
      const worksheet = await this.worksheetModel.findByPk(id);
      if (!worksheet) {
        throw new HttpException('Worksheet not found', HttpStatus.NOT_FOUND);
      }

      await worksheet.destroy();
      return { message: 'Worksheet deleted successfully' };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Failed to delete worksheet',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
