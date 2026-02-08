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
exports.EmployeesService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const employee_model_1 = require("./employee.model");
let EmployeesService = class EmployeesService {
    employeeModel;
    constructor(employeeModel) {
        this.employeeModel = employeeModel;
    }
    async findAll() {
        try {
            const employees = await this.employeeModel.findAll({
                order: [['createdAt', 'DESC']],
            });
            return employees.map((emp) => ({
                id: emp.id,
                name: emp.name,
                role: emp.role,
                phone: emp.phone,
                dailySalary: emp.dailySalary,
                aadharNumber: emp.aadharNumber,
                dob: emp.dob,
                address: emp.address,
                status: emp.status,
                createdAt: emp.createdAt,
            }));
        }
        catch (error) {
            throw new common_1.HttpException('Failed to fetch employees', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async create(dto) {
        try {
            const employee = await this.employeeModel.create({
                name: dto.name,
                role: dto.role,
                phone: dto.phone,
                dailySalary: Number(dto.dailySalary),
                aadharNumber: dto.aadharNumber,
                dob: dto.dob,
                address: dto.address,
                status: dto.status || 'Active',
            });
            return {
                id: employee.id,
                name: employee.name,
                role: employee.role,
                phone: employee.phone,
                dailySalary: employee.dailySalary,
                aadharNumber: employee.aadharNumber,
                dob: employee.dob,
                address: employee.address,
                status: employee.status,
                createdAt: employee.createdAt,
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException('Failed to create employee', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, dto) {
        try {
            const employee = await this.employeeModel.findByPk(id);
            if (!employee) {
                throw new common_1.HttpException('Employee not found', common_1.HttpStatus.NOT_FOUND);
            }
            if (dto.name !== undefined)
                employee.name = dto.name;
            if (dto.role !== undefined)
                employee.role = dto.role;
            if (dto.phone !== undefined)
                employee.phone = dto.phone;
            if (dto.dailySalary !== undefined)
                employee.dailySalary = Number(dto.dailySalary);
            if (dto.aadharNumber !== undefined)
                employee.aadharNumber = dto.aadharNumber;
            if (dto.dob !== undefined)
                employee.dob = dto.dob;
            if (dto.address !== undefined)
                employee.address = dto.address;
            if (dto.status !== undefined)
                employee.status = dto.status;
            await employee.save();
            return {
                id: employee.id,
                name: employee.name,
                role: employee.role,
                phone: employee.phone,
                dailySalary: employee.dailySalary,
                aadharNumber: employee.aadharNumber,
                dob: employee.dob,
                address: employee.address,
                status: employee.status,
                createdAt: employee.createdAt,
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException('Failed to update employee', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        try {
            const employee = await this.employeeModel.findByPk(id);
            if (!employee) {
                throw new common_1.HttpException('Employee not found', common_1.HttpStatus.NOT_FOUND);
            }
            await employee.destroy();
            return { message: 'Employee deleted successfully' };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException('Failed to delete employee', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.EmployeesService = EmployeesService;
exports.EmployeesService = EmployeesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(employee_model_1.Employee)),
    __metadata("design:paramtypes", [Object])
], EmployeesService);
//# sourceMappingURL=employees.service.js.map