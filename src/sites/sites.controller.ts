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
import { SitesService } from './sites.service';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';

@Controller('sites')
export class SitesController {
  constructor(private readonly sitesService: SitesService) {}

  @Get()
  async findAll() {
    try {
      return await this.sitesService.findAll();
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Unexpected error in sites',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async create(@Body() dto: CreateSiteDto) {
    try {
      return await this.sitesService.create(dto);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Unexpected error in create site',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateSiteDto) {
    try {
      return await this.sitesService.update(Number(id), dto);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Unexpected error in update site',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.sitesService.remove(Number(id));
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Unexpected error in delete site',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
