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
exports.SalaryAdvancesController = void 0;
const common_1 = require("@nestjs/common");
const salary_advances_service_1 = require("./salary-advances.service");
const create_salary_advance_dto_1 = require("./dto/create-salary-advance.dto");
let SalaryAdvancesController = class SalaryAdvancesController {
    salaryAdvancesService;
    constructor(salaryAdvancesService) {
        this.salaryAdvancesService = salaryAdvancesService;
    }
    async findAll() {
        try {
            return await this.salaryAdvancesService.findAll();
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException('Unexpected error in salary advances', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async create(dto) {
        try {
            return await this.salaryAdvancesService.create(dto);
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException('Unexpected error in create salary advance', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        try {
            return await this.salaryAdvancesService.remove(Number(id));
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException('Unexpected error in delete salary advance', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.SalaryAdvancesController = SalaryAdvancesController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SalaryAdvancesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_salary_advance_dto_1.CreateSalaryAdvanceDto]),
    __metadata("design:returntype", Promise)
], SalaryAdvancesController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SalaryAdvancesController.prototype, "remove", null);
exports.SalaryAdvancesController = SalaryAdvancesController = __decorate([
    (0, common_1.Controller)('salary-advances'),
    __metadata("design:paramtypes", [salary_advances_service_1.SalaryAdvancesService])
], SalaryAdvancesController);
//# sourceMappingURL=salary-advances.controller.js.map