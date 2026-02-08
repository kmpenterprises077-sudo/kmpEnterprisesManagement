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
exports.InvoicesService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const invoice_model_1 = require("./invoice.model");
let InvoicesService = class InvoicesService {
    invoiceModel;
    constructor(invoiceModel) {
        this.invoiceModel = invoiceModel;
    }
    async findAll() {
        try {
            const invoices = await this.invoiceModel.findAll({
                order: [['createdAt', 'DESC']],
            });
            return invoices.map((inv) => ({
                id: inv.id,
                type: inv.type,
                employeeId: inv.employeeId,
                siteId: inv.siteId,
                dateRange: inv.dateRange,
                amount: Number(inv.amount),
                status: inv.status,
                generatedDate: inv.generatedDate,
                paidDate: inv.paidDate,
                details: inv.details,
                createdAt: inv.createdAt,
            }));
        }
        catch (error) {
            throw new common_1.HttpException('Failed to fetch invoices', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async create(dto) {
        try {
            const invoice = await this.invoiceModel.create({
                type: dto.type,
                employeeId: dto.employeeId ?? null,
                siteId: dto.siteId ?? null,
                dateRange: dto.dateRange,
                amount: Number(dto.amount),
                status: dto.status || 'UNPAID',
                generatedDate: dto.generatedDate,
                paidDate: dto.paidDate ?? null,
                details: dto.details ?? null,
            });
            return {
                id: invoice.id,
                type: invoice.type,
                employeeId: invoice.employeeId,
                siteId: invoice.siteId,
                dateRange: invoice.dateRange,
                amount: Number(invoice.amount),
                status: invoice.status,
                generatedDate: invoice.generatedDate,
                paidDate: invoice.paidDate,
                details: invoice.details,
                createdAt: invoice.createdAt,
            };
        }
        catch (error) {
            throw new common_1.HttpException('Failed to create invoice', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, dto) {
        try {
            const invoice = await this.invoiceModel.findByPk(id);
            if (!invoice) {
                throw new common_1.HttpException('Invoice not found', common_1.HttpStatus.NOT_FOUND);
            }
            if (dto.status !== undefined)
                invoice.status = dto.status;
            if (dto.paidDate !== undefined)
                invoice.paidDate = dto.paidDate ?? null;
            await invoice.save();
            return {
                id: invoice.id,
                type: invoice.type,
                employeeId: invoice.employeeId,
                siteId: invoice.siteId,
                dateRange: invoice.dateRange,
                amount: Number(invoice.amount),
                status: invoice.status,
                generatedDate: invoice.generatedDate,
                paidDate: invoice.paidDate,
                details: invoice.details,
                createdAt: invoice.createdAt,
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException('Failed to update invoice', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        try {
            const invoice = await this.invoiceModel.findByPk(id);
            if (!invoice) {
                throw new common_1.HttpException('Invoice not found', common_1.HttpStatus.NOT_FOUND);
            }
            await invoice.destroy();
            return { message: 'Invoice deleted successfully' };
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException('Failed to delete invoice', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.InvoicesService = InvoicesService;
exports.InvoicesService = InvoicesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(invoice_model_1.Invoice)),
    __metadata("design:paramtypes", [Object])
], InvoicesService);
//# sourceMappingURL=invoices.service.js.map