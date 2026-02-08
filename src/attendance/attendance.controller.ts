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
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Get()
  async findAll() {
    try {
      return await this.attendanceService.findAll();
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Unexpected error in attendance',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async create(@Body() dto: CreateAttendanceDto) {
    try {
      return await this.attendanceService.create(dto);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Unexpected error in create attendance',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateAttendanceDto) {
    try {
      return await this.attendanceService.update(Number(id), dto);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Unexpected error in update attendance',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.attendanceService.remove(Number(id));
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Unexpected error in delete attendance',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
