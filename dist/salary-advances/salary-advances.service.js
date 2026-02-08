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
exports.SalaryAdvancesService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const salary_advance_model_1 = require("./salary-advance.model");
const employee_model_1 = require("../employees/employee.model");
let SalaryAdvancesService = class SalaryAdvancesService {
    advanceModel;
    employeeModel;
    constructor(advanceModel, employeeModel) {
        this.advanceModel = advanceModel;
        this.employeeModel = employeeModel;
    }
    async findAll() {
        try {
            const advances = await this.advanceModel.findAll({
                include: [{ model: employee_model_1.Employee }],
                order: [['date', 'DESC']],
            });
            return advances.map((adv) => ({
                id: adv.id,
                employeeId: adv.employeeId,
                amount: adv.amount,
                date: adv.date,
                note: adv.note,
                employeeName: adv.employee?.name || null,
            }));
        }
        catch (error) {
            throw new common_1.HttpException('Failed to fetch salary advances', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async create(dto) {
        try {
            const employee = await this.employeeModel.findByPk(dto.employeeId);
            if (!employee) {
                throw new common_1.HttpException('Employee not found', common_1.HttpStatus.NOT_FOUND);
            }
            const advance = await this.advanceModel.create({
                employeeId: dto.employeeId,
                amount: Number(dto.amount),
                date: dto.date,
                note: dto.note,
            });
            return {
                id: advance.id,
                employeeId: advance.employeeId,
                amount: advance.amount,
                date: advance.date,
                note: advance.note,
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException('Failed to create salary advance', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        try {
            const advance = await this.advanceModel.findByPk(id);
            if (!advance) {
                throw new common_1.HttpException('Advance not found', common_1.HttpStatus.NOT_FOUND);
            }
            await advance.destroy();
            return { message: 'Advance deleted successfully' };
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException('Failed to delete salary advance', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.SalaryAdvancesService = SalaryAdvancesService;
exports.SalaryAdvancesService = SalaryAdvancesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(salary_advance_model_1.SalaryAdvance)),
    __param(1, (0, sequelize_1.InjectModel)(employee_model_1.Employee)),
    __metadata("design:paramtypes", [Object, Object])
], SalaryAdvancesService);
//# sourceMappingURL=salary-advances.service.js.map