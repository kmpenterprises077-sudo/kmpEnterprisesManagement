"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SitesService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const site_model_1 = require("./site.model");
let SitesService = class SitesService {
    siteModel;
    constructor(siteModel) {
        this.siteModel = siteModel;
    }
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
        }
        catch (error) {
            throw new common_1.HttpException('Failed to fetch sites', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async create(dto) {
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
        }
        catch (error) {
            throw new common_1.HttpException('Failed to create site', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, dto) {
        try {
            const site = await this.siteModel.findByPk(id);
            if (!site) {
                throw new common_1.HttpException('Site not found', common_1.HttpStatus.NOT_FOUND);
            }
            if (dto.name !== undefined)
                site.name = dto.name;
            if (dto.location !== undefined)
                site.location = dto.location;
            if (dto.manager !== undefined)
                site.manager = dto.manager;
            if (dto.company !== undefined)
                site.company = dto.company;
            if (dto.status !== undefined)
                site.status = dto.status;
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
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException('Failed to update site', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        try {
            const site = await this.siteModel.findByPk(id);
            if (!site) {
                throw new common_1.HttpException('Site not found', common_1.HttpStatus.NOT_FOUND);
            }
            await site.destroy();
            return { message: 'Site deleted successfully' };
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException('Failed to delete site', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.SitesService = SitesService;
exports.SitesService = SitesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(site_model_1.Site)),
    __metadata("design:paramtypes", [Object])
], SitesService);
//# sourceMappingURL=sites.service.js.map