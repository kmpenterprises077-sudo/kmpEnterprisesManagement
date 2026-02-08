import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SalaryAdvance } from './salary-advance.model';
import { Employee } from '../employees/employee.model';
import { CreateSalaryAdvanceDto } from './dto/create-salary-advance.dto';

@Injectable()
export class SalaryAdvancesService {
  constructor(
    @InjectModel(SalaryAdvance)
    private readonly advanceModel: typeof SalaryAdvance,
    @InjectModel(Employee) private readonly employeeModel: typeof Employee,
  ) {}

  async findAll() {
    try {
      const advances = await this.advanceModel.findAll({
        include: [{ model: Employee }],
        order: [['date', 'DESC']],
      });

      return advances.map((adv) => ({
        id: adv.id,
        employeeId: adv.employeeId,
        amount: adv.amount,
        date: adv.date,
        note: adv.note,
        employeeName: adv.employee?.name || null,
      }));
    } catch (error) {
      throw new HttpException(
        'Failed to fetch salary advances',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(dto: CreateSalaryAdvanceDto) {
    try {
      const employee = await this.employeeModel.findByPk(dto.employeeId);
      if (!employee) {
        throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
      }

      const advance = await this.advanceModel.create({
        employeeId: dto.employeeId,
        amount: Number(dto.amount),
        date: dto.date,
        note: dto.note,
      });

      return {
        id: advance.id,
        employeeId: advance.employeeId,
        amount: advance.amount,
        date: advance.date,
        note: advance.note,
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Failed to create salary advance',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {
      const advance = await this.advanceModel.findByPk(id);
      if (!advance) {
        throw new HttpException('Advance not found', HttpStatus.NOT_FOUND);
      }

      await advance.destroy();
      return { message: 'Advance deleted successfully' };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Failed to delete salary advance',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
