import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SitesController } from './sites.controller';
import { SitesService } from './sites.service';
import { Site } from './site.model';
import { Employee } from '../employees/employee.model';

@Module({
  imports: [SequelizeModule.forFeature([Site, Employee])],
  controllers: [SitesController],
  providers: [SitesService],
})
export class SitesModule {}
