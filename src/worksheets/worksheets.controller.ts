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
import { WorksheetsService } from './worksheets.service';
import { CreateWorksheetDto } from './dto/create-worksheet.dto';
import { UpdateWorksheetDto } from './dto/update-worksheet.dto';

@Controller('worksheets')
export class WorksheetsController {
  constructor(private readonly worksheetsService: WorksheetsService) {}

  @Get()
  async findAll() {
    try {
      return await this.worksheetsService.findAll();
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Unexpected error in worksheets',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async create(@Body() dto: CreateWorksheetDto) {
    try {
      return await this.worksheetsService.create(dto);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Unexpected error in create worksheet',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateWorksheetDto) {
    try {
      return await this.worksheetsService.update(Number(id), dto);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Unexpected error in update worksheet',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.worksheetsService.remove(Number(id));
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Unexpected error in delete worksheet',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
