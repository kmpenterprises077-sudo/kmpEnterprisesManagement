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
exports.WorksheetsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const worksheet_model_1 = require("./worksheet.model");
const employee_model_1 = require("../employees/employee.model");
const site_model_1 = require("../sites/site.model");
let WorksheetsService = class WorksheetsService {
    worksheetModel;
    employeeModel;
    siteModel;
    constructor(worksheetModel, employeeModel, siteModel) {
        this.worksheetModel = worksheetModel;
        this.employeeModel = employeeModel;
        this.siteModel = siteModel;
    }
    async findAll() {
        try {
            const worksheets = await this.worksheetModel.findAll({
                include: [{ model: employee_model_1.Employee }, { model: site_model_1.Site }],
                order: [['date', 'DESC']],
            });
            return worksheets.map((ws) => ({
                id: ws.id,
                date: ws.date,
                siteId: ws.siteId,
                employeeId: ws.employeeId,
                description: ws.description,
                workers: ws.workers,
                supervisor: ws.supervisor,
                status: ws.status,
                employeeName: ws.employee?.name || null,
                siteName: ws.site?.name || null,
            }));
        }
        catch (error) {
            throw new common_1.HttpException('Failed to fetch worksheets', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async create(dto) {
        try {
            const employee = await this.employeeModel.findByPk(dto.employeeId);
            if (!employee) {
                throw new common_1.HttpException('Employee not found', common_1.HttpStatus.NOT_FOUND);
            }
            const site = await this.siteModel.findByPk(dto.siteId);
            if (!site) {
                throw new common_1.HttpException('Site not found', common_1.HttpStatus.NOT_FOUND);
            }
            const worksheet = await this.worksheetModel.create({
                date: dto.date,
                siteId: dto.siteId,
                employeeId: dto.employeeId,
                description: dto.description,
                workers: dto.workers,
                supervisor: dto.supervisor,
                status: dto.status || 'Pending',
            });
            return {
                id: worksheet.id,
                date: worksheet.date,
                siteId: worksheet.siteId,
                employeeId: worksheet.employeeId,
                description: worksheet.description,
                workers: worksheet.workers,
                supervisor: worksheet.supervisor,
                status: worksheet.status,
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException('Failed to create worksheet', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, dto) {
        try {
            const worksheet = await this.worksheetModel.findByPk(id);
            if (!worksheet) {
                throw new common_1.HttpException('Worksheet not found', common_1.HttpStatus.NOT_FOUND);
            }
            if (dto.employeeId !== undefined) {
                const employee = await this.employeeModel.findByPk(dto.employeeId);
                if (!employee) {
                    throw new common_1.HttpException('Employee not found', common_1.HttpStatus.NOT_FOUND);
                }
                worksheet.employeeId = dto.employeeId;
            }
            if (dto.siteId !== undefined) {
                const site = await this.siteModel.findByPk(dto.siteId);
                if (!site) {
                    throw new common_1.HttpException('Site not found', common_1.HttpStatus.NOT_FOUND);
                }
                worksheet.siteId = dto.siteId;
            }
            if (dto.date !== undefined)
                worksheet.date = dto.date;
            if (dto.description !== undefined)
                worksheet.description = dto.description;
            if (dto.workers !== undefined)
                worksheet.workers = dto.workers;
            if (dto.supervisor !== undefined)
                worksheet.supervisor = dto.supervisor;
            if (dto.status !== undefined)
                worksheet.status = dto.status;
            await worksheet.save();
            return {
                id: worksheet.id,
                date: worksheet.date,
                siteId: worksheet.siteId,
                employeeId: worksheet.employeeId,
                description: worksheet.description,
                workers: worksheet.workers,
                supervisor: worksheet.supervisor,
                status: worksheet.status,
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException('Failed to update worksheet', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        try {
            const worksheet = await this.worksheetModel.findByPk(id);
            if (!worksheet) {
                throw new common_1.HttpException('Worksheet not found', common_1.HttpStatus.NOT_FOUND);
            }
            await worksheet.destroy();
            return { message: 'Worksheet deleted successfully' };
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException('Failed to delete worksheet', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.WorksheetsService = WorksheetsService;
exports.WorksheetsService = WorksheetsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(worksheet_model_1.Worksheet)),
    __param(1, (0, sequelize_1.InjectModel)(employee_model_1.Employee)),
    __param(2, (0, sequelize_1.InjectModel)(site_model_1.Site)),
    __metadata("design:paramtypes", [Object, Object, Object])
], WorksheetsService);
//# sourceMappingURL=worksheets.service.js.map