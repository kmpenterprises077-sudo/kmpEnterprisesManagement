import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Site } from './site.model';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';

@Injectable()
export class SitesService {
  constructor(@InjectModel(Site) private readonly siteModel: typeof Site) {}

  async findAll() {
    try {
      const sites = await this.siteModel.findAll({
        order: [['createdAt', 'DESC']],
      });

      return sites.map((site) => ({
        id: site.id,
        name: site.name,
        location: site.location,
        manager: site.manager,
        company: site.company,
        status: site.status,
        createdAt: site.createdAt,
      }));
    } catch (error) {
      throw new HttpException(
        'Failed to fetch sites',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(dto: CreateSiteDto) {
    try {
      const site = await this.siteModel.create({
        name: dto.name,
        location: dto.location,
        manager: dto.manager,
        company: dto.company,
        status: dto.status || 'Active',
      });

      return {
        id: site.id,
        name: site.name,
        location: site.location,
        manager: site.manager,
        company: site.company,
        status: site.status,
        createdAt: site.createdAt,
      };
    } catch (error) {
      throw new HttpException(
        'Failed to create site',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, dto: UpdateSiteDto) {
    try {
      const site = await this.siteModel.findByPk(id);
      if (!site) {
        throw new HttpException('Site not found', HttpStatus.NOT_FOUND);
      }

      if (dto.name !== undefined) site.name = dto.name;
      if (dto.location !== undefined) site.location = dto.location;
      if (dto.manager !== undefined) site.manager = dto.manager;
      if (dto.company !== undefined) site.company = dto.company;
      if (dto.status !== undefined) site.status = dto.status;

      await site.save();

      return {
        id: site.id,
        name: site.name,
        location: site.location,
        manager: site.manager,
        company: site.company,
        status: site.status,
        createdAt: site.createdAt,
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Failed to update site',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {
      const site = await this.siteModel.findByPk(id);
      if (!site) {
        throw new HttpException('Site not found', HttpStatus.NOT_FOUND);
      }

      await site.destroy();
      return { message: 'Site deleted successfully' };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Failed to delete site',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
