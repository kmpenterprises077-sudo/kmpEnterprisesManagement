import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Employee } from './employee.model';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee) private readonly employeeModel: typeof Employee,
  ) {}

  async findAll() {
    try {
      const employees = await this.employeeModel.findAll({
        order: [['createdAt', 'DESC']],
      });

      return employees.map((emp) => ({
        id: emp.id,
        name: emp.name,
        role: emp.role,
        phone: emp.phone,
        dailySalary: emp.dailySalary,
        aadharNumber: emp.aadharNumber,
        dob: emp.dob,
        address: emp.address,
        status: emp.status,
        createdAt: emp.createdAt,
      }));
    } catch (error) {
      throw new HttpException(
        'Failed to fetch employees',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(dto: CreateEmployeeDto) {
    try {
      const employee = await this.employeeModel.create({
        name: dto.name,
        role: dto.role,
        phone: dto.phone,
        dailySalary: Number(dto.dailySalary),
        aadharNumber: dto.aadharNumber,
        dob: dto.dob,
        address: dto.address,
        status: dto.status || 'Active',
      });

      return {
        id: employee.id,
        name: employee.name,
        role: employee.role,
        phone: employee.phone,
        dailySalary: employee.dailySalary,
        aadharNumber: employee.aadharNumber,
        dob: employee.dob,
        address: employee.address,
        status: employee.status,
        createdAt: employee.createdAt,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'Failed to create employee',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, dto: UpdateEmployeeDto) {
    try {
      const employee = await this.employeeModel.findByPk(id);
      if (!employee) {
        throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
      }

      if (dto.name !== undefined) employee.name = dto.name;
      if (dto.role !== undefined) employee.role = dto.role;
      if (dto.phone !== undefined) employee.phone = dto.phone;
      if (dto.dailySalary !== undefined)
        employee.dailySalary = Number(dto.dailySalary);
      if (dto.aadharNumber !== undefined)
        employee.aadharNumber = dto.aadharNumber;
      if (dto.dob !== undefined) employee.dob = dto.dob;
      if (dto.address !== undefined) employee.address = dto.address;
      if (dto.status !== undefined) employee.status = dto.status;

      await employee.save();

      return {
        id: employee.id,
        name: employee.name,
        role: employee.role,
        phone: employee.phone,
        dailySalary: employee.dailySalary,
        aadharNumber: employee.aadharNumber,
        dob: employee.dob,
        address: employee.address,
        status: employee.status,
        createdAt: employee.createdAt,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'Failed to update employee',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {
      const employee = await this.employeeModel.findByPk(id);
      if (!employee) {
        throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
      }

      await employee.destroy();
      return { message: 'Employee deleted successfully' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'Failed to delete employee',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
