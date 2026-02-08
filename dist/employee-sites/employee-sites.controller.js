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
exports.EmployeeSitesController = void 0;
const common_1 = require("@nestjs/common");
const employee_sites_service_1 = require("./employee-sites.service");
const create_employee_site_dto_1 = require("./dto/create-employee-site.dto");
let EmployeeSitesController = class EmployeeSitesController {
    employeeSitesService;
    constructor(employeeSitesService) {
        this.employeeSitesService = employeeSitesService;
    }
    async findAll() {
        try {
            return await this.employeeSitesService.findAll();
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException('Unexpected error in employee sites', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findBySite(siteId) {
        try {
            return await this.employeeSitesService.findBySite(Number(siteId));
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException('Unexpected error in employee sites by site', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findByEmployee(employeeId) {
        try {
            return await this.employeeSitesService.findByEmployee(Number(employeeId));
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException('Unexpected error in employee sites by employee', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async create(dto) {
        try {
            return await this.employeeSitesService.create(dto);
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException('Unexpected error in create employee site', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        try {
            return await this.employeeSitesService.remove(Number(id));
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException('Unexpected error in delete employee site', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.EmployeeSitesController = EmployeeSitesController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EmployeeSitesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('site/:siteId'),
    __param(0, (0, common_1.Param)('siteId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeeSitesController.prototype, "findBySite", null);
__decorate([
    (0, common_1.Get)('employee/:employeeId'),
    __param(0, (0, common_1.Param)('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeeSitesController.prototype, "findByEmployee", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_employee_site_dto_1.CreateEmployeeSiteDto]),
    __metadata("design:returntype", Promise)
], EmployeeSitesController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeeSitesController.prototype, "remove", null);
exports.EmployeeSitesController = EmployeeSitesController = __decorate([
    (0, common_1.Controller)('employee-sites'),
    __metadata("design:paramtypes", [employee_sites_service_1.EmployeeSitesService])
], EmployeeSitesController);
//# sourceMappingURL=employee-sites.controller.js.map