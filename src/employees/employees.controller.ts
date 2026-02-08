import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  async findAll() {
    try {
      return await this.employeesService.findAll();
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Unexpected error in employees',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async create(@Body() dto: CreateEmployeeDto) {
    try {
      return await this.employeesService.create(dto);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Unexpected error in create employee',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateEmployeeDto) {
    try {
      return await this.employeesService.update(Number(id), dto);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Unexpected error in update employee',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.employeesService.remove(Number(id));
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Unexpected error in delete employee',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
