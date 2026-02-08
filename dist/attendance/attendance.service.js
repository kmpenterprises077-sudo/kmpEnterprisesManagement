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
exports.AttendanceService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const attendance_model_1 = require("./attendance.model");
const employee_model_1 = require("../employees/employee.model");
const site_model_1 = require("../sites/site.model");
let AttendanceService = class AttendanceService {
    attendanceModel;
    employeeModel;
    siteModel;
    constructor(attendanceModel, employeeModel, siteModel) {
        this.attendanceModel = attendanceModel;
        this.employeeModel = employeeModel;
        this.siteModel = siteModel;
    }
    async findAll() {
        try {
            const records = await this.attendanceModel.findAll({
                include: [{ model: employee_model_1.Employee }, { model: site_model_1.Site }],
                order: [['date', 'DESC']],
            });
            return records.map((rec) => ({
                id: rec.id,
                date: rec.date,
                status: rec.status,
                dayType: rec.dayType,
                employeeId: rec.employeeId,
                siteId: rec.siteId,
                employeeName: rec.employee?.name || null,
                siteName: rec.site?.name || null,
            }));
        }
        catch (error) {
            throw new common_1.HttpException('Failed to fetch attendance', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async create(dto) {
        try {
            const employee = await this.employeeModel.findByPk(dto.employeeId);
            if (!employee) {
                throw new common_1.HttpException('Employee not found', common_1.HttpStatus.NOT_FOUND);
            }
            if (dto.siteId) {
                const site = await this.siteModel.findByPk(dto.siteId);
                if (!site) {
                    throw new common_1.HttpException('Site not found', common_1.HttpStatus.NOT_FOUND);
                }
            }
            const record = await this.attendanceModel.create({
                date: dto.date,
                status: dto.status,
                dayType: dto.dayType || 'Full',
                employeeId: dto.employeeId,
                siteId: dto.siteId ?? null,
            });
            return {
                id: record.id,
                date: record.date,
                status: record.status,
                dayType: record.dayType,
                employeeId: record.employeeId,
                siteId: record.siteId,
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException('Failed to create attendance', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, dto) {
        try {
            const record = await this.attendanceModel.findByPk(id);
            if (!record) {
                throw new common_1.HttpException('Attendance not found', common_1.HttpStatus.NOT_FOUND);
            }
            if (dto.employeeId !== undefined) {
                const employee = await this.employeeModel.findByPk(dto.employeeId);
                if (!employee) {
                    throw new common_1.HttpException('Employee not found', common_1.HttpStatus.NOT_FOUND);
                }
                record.employeeId = dto.employeeId;
            }
            if (dto.siteId !== undefined) {
                const siteId = dto.siteId ?? null;
                if (siteId) {
                    const site = await this.siteModel.findByPk(siteId);
                    if (!site) {
                        throw new common_1.HttpException('Site not found', common_1.HttpStatus.NOT_FOUND);
                    }
                }
                record.siteId = siteId;
            }
            if (dto.date !== undefined)
                record.date = dto.date;
            if (dto.status !== undefined)
                record.status = dto.status;
            if (dto.dayType !== undefined)
                record.dayType = dto.dayType;
            await record.save();
            return {
                id: record.id,
                date: record.date,
                status: record.status,
                dayType: record.dayType,
                employeeId: record.employeeId,
                siteId: record.siteId,
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException('Failed to update attendance', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        try {
            const record = await this.attendanceModel.findByPk(id);
            if (!record) {
                throw new common_1.HttpException('Attendance not found', common_1.HttpStatus.NOT_FOUND);
            }
            await record.destroy();
            return { message: 'Attendance deleted successfully' };
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException('Failed to delete attendance', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.AttendanceService = AttendanceService;
exports.AttendanceService = AttendanceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(attendance_model_1.Attendance)),
    __param(1, (0, sequelize_1.InjectModel)(employee_model_1.Employee)),
    __param(2, (0, sequelize_1.InjectModel)(site_model_1.Site)),
    __metadata("design:paramtypes", [Object, Object, Object])
], AttendanceService);
//# sourceMappingURL=attendance.service.js.map