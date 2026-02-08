import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EmployeeSite } from './employee-site.model';
import { Employee } from '../employees/employee.model';
import { Site } from '../sites/site.model';
import { CreateEmployeeSiteDto } from './dto/create-employee-site.dto';

@Injectable()
export class EmployeeSitesService {
  constructor(
    @InjectModel(EmployeeSite)
    private readonly employeeSiteModel: typeof EmployeeSite,
    @InjectModel(Employee) private readonly employeeModel: typeof Employee,
    @InjectModel(Site) private readonly siteModel: typeof Site,
  ) {}

  async findAll() {
    try {
      const rows = await this.employeeSiteModel.findAll({
        include: [{ model: Employee }, { model: Site }],
        order: [['assignedAt', 'DESC']],
      });

      return rows.map((row) => ({
        id: row.id,
        employeeId: row.employeeId,
        siteId: row.siteId,
        assignedAt: row.assignedAt,
        employeeName: row.employee?.name || null,
        siteName: row.site?.name || null,
      }));
    } catch (error) {
      throw new HttpException(
        'Failed to fetch employee site assignments',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findBySite(siteId: number) {
    try {
      const rows = await this.employeeSiteModel.findAll({
        where: { siteId },
        include: [{ model: Employee }, { model: Site }],
        order: [['assignedAt', 'DESC']],
      });

      return rows.map((row) => ({
        id: row.id,
        employeeId: row.employeeId,
        siteId: row.siteId,
        assignedAt: row.assignedAt,
        employeeName: row.employee?.name || null,
        siteName: row.site?.name || null,
      }));
    } catch (error) {
      throw new HttpException(
        'Failed to fetch assignments for site',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByEmployee(employeeId: number) {
    try {
      const rows = await this.employeeSiteModel.findAll({
        where: { employeeId },
        include: [{ model: Employee }, { model: Site }],
        order: [['assignedAt', 'DESC']],
      });

      return rows.map((row) => ({
        id: row.id,
        employeeId: row.employeeId,
        siteId: row.siteId,
        assignedAt: row.assignedAt,
        employeeName: row.employee?.name || null,
        siteName: row.site?.name || null,
      }));
    } catch (error) {
      throw new HttpException(
        'Failed to fetch assignments for employee',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(dto: CreateEmployeeSiteDto) {
    try {
      const employee = await this.employeeModel.findByPk(dto.employeeId);
      if (!employee) {
        throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
      }

      const site = await this.siteModel.findByPk(dto.siteId);
      if (!site) {
        throw new HttpException('Site not found', HttpStatus.NOT_FOUND);
      }

      const existing = await this.employeeSiteModel.findOne({
        where: { employeeId: dto.employeeId, siteId: dto.siteId },
      });
      if (existing) {
        throw new HttpException(
          'Assignment already exists',
          HttpStatus.CONFLICT,
        );
      }

      const row = await this.employeeSiteModel.create({
        employeeId: dto.employeeId,
        siteId: dto.siteId,
        assignedAt: new Date(),
      });

      return {
        id: row.id,
        employeeId: row.employeeId,
        siteId: row.siteId,
        assignedAt: row.assignedAt,
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Failed to create assignment',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {
      const row = await this.employeeSiteModel.findByPk(id);
      if (!row) {
        throw new HttpException('Assignment not found', HttpStatus.NOT_FOUND);
      }
      await row.destroy();
      return { message: 'Assignment deleted successfully' };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Failed to delete assignment',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
