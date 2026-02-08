import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { EmployeeSitesService } from './employee-sites.service';
import { CreateEmployeeSiteDto } from './dto/create-employee-site.dto';

@Controller('employee-sites')
export class EmployeeSitesController {
  constructor(private readonly employeeSitesService: EmployeeSitesService) {}

  @Get()
  async findAll() {
    try {
      return await this.employeeSitesService.findAll();
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Unexpected error in employee sites',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('site/:siteId')
  async findBySite(@Param('siteId') siteId: string) {
    try {
      return await this.employeeSitesService.findBySite(Number(siteId));
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Unexpected error in employee sites by site',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('employee/:employeeId')
  async findByEmployee(@Param('employeeId') employeeId: string) {
    try {
      return await this.employeeSitesService.findByEmployee(Number(employeeId));
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Unexpected error in employee sites by employee',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async create(@Body() dto: CreateEmployeeSiteDto) {
    try {
      return await this.employeeSitesService.create(dto);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Unexpected error in create employee site',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.employeeSitesService.remove(Number(id));
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Unexpected error in delete employee site',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
