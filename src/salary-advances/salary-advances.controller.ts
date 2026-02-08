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
import { SalaryAdvancesService } from './salary-advances.service';
import { CreateSalaryAdvanceDto } from './dto/create-salary-advance.dto';

@Controller('salary-advances')
export class SalaryAdvancesController {
  constructor(private readonly salaryAdvancesService: SalaryAdvancesService) {}

  @Get()
  async findAll() {
    try {
      return await this.salaryAdvancesService.findAll();
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Unexpected error in salary advances',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async create(@Body() dto: CreateSalaryAdvanceDto) {
    try {
      return await this.salaryAdvancesService.create(dto);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Unexpected error in create salary advance',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.salaryAdvancesService.remove(Number(id));
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Unexpected error in delete salary advance',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
