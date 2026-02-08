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
exports.EmployeeSitesService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const employee_site_model_1 = require("./employee-site.model");
const employee_model_1 = require("../employees/employee.model");
const site_model_1 = require("../sites/site.model");
let EmployeeSitesService = class EmployeeSitesService {
    employeeSiteModel;
    employeeModel;
    siteModel;
    constructor(employeeSiteModel, employeeModel, siteModel) {
        this.employeeSiteModel = employeeSiteModel;
        this.employeeModel = employeeModel;
        this.siteModel = siteModel;
    }
    async findAll() {
        try {
            const rows = await this.employeeSiteModel.findAll({
                include: [{ model: employee_model_1.Employee }, { model: site_model_1.Site }],
                order: [['assignedAt', 'DESC']],
            });
            return rows.map((row) => ({
                id: row.id,
                employeeId: row.employeeId,
                siteId: row.siteId,
                assignedAt: row.assignedAt,
                employeeName: row.employee?.name || null,
                siteName: row.site?.name || null,
            }));
        }
        catch (error) {
            throw new common_1.HttpException('Failed to fetch employee site assignments', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findBySite(siteId) {
        try {
            const rows = await this.employeeSiteModel.findAll({
                where: { siteId },
                include: [{ model: employee_model_1.Employee }, { model: site_model_1.Site }],
                order: [['assignedAt', 'DESC']],
            });
            return rows.map((row) => ({
                id: row.id,
                employeeId: row.employeeId,
                siteId: row.siteId,
                assignedAt: row.assignedAt,
                employeeName: row.employee?.name || null,
                siteName: row.site?.name || null,
            }));
        }
        catch (error) {
            throw new common_1.HttpException('Failed to fetch assignments for site', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findByEmployee(employeeId) {
        try {
            const rows = await this.employeeSiteModel.findAll({
                where: { employeeId },
                include: [{ model: employee_model_1.Employee }, { model: site_model_1.Site }],
                order: [['assignedAt', 'DESC']],
            });
            return rows.map((row) => ({
                id: row.id,
                employeeId: row.employeeId,
                siteId: row.siteId,
                assignedAt: row.assignedAt,
                employeeName: row.employee?.name || null,
                siteName: row.site?.name || null,
            }));
        }
        catch (error) {
            throw new common_1.HttpException('Failed to fetch assignments for employee', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
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
            const existing = await this.employeeSiteModel.findOne({
                where: { employeeId: dto.employeeId, siteId: dto.siteId },
            });
            if (existing) {
                throw new common_1.HttpException('Assignment already exists', common_1.HttpStatus.CONFLICT);
            }
            const row = await this.employeeSiteModel.create({
                employeeId: dto.employeeId,
                siteId: dto.siteId,
                assignedAt: new Date(),
            });
            return {
                id: row.id,
                employeeId: row.employeeId,
                siteId: row.siteId,
                assignedAt: row.assignedAt,
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException('Failed to create assignment', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        try {
            const row = await this.employeeSiteModel.findByPk(id);
            if (!row) {
                throw new common_1.HttpException('Assignment not found', common_1.HttpStatus.NOT_FOUND);
            }
            await row.destroy();
            return { message: 'Assignment deleted successfully' };
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException('Failed to delete assignment', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.EmployeeSitesService = EmployeeSitesService;
exports.EmployeeSitesService = EmployeeSitesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(employee_site_model_1.EmployeeSite)),
    __param(1, (0, sequelize_1.InjectModel)(employee_model_1.Employee)),
    __param(2, (0, sequelize_1.InjectModel)(site_model_1.Site)),
    __metadata("design:paramtypes", [Object, Object, Object])
], EmployeeSitesService);
//# sourceMappingURL=employee-sites.service.js.map