import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Invoice } from './invoice.model';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectModel(Invoice) private readonly invoiceModel: typeof Invoice,
  ) {}

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
    } catch (error) {
      throw new HttpException(
        'Failed to fetch invoices',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(dto: CreateInvoiceDto) {
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
    } catch (error) {
      throw new HttpException(
        'Failed to create invoice',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, dto: UpdateInvoiceDto) {
    try {
      const invoice = await this.invoiceModel.findByPk(id);
      if (!invoice) {
        throw new HttpException('Invoice not found', HttpStatus.NOT_FOUND);
      }

      if (dto.status !== undefined) invoice.status = dto.status;
      if (dto.paidDate !== undefined) invoice.paidDate = dto.paidDate ?? null;

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
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Failed to update invoice',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {
      const invoice = await this.invoiceModel.findByPk(id);
      if (!invoice) {
        throw new HttpException('Invoice not found', HttpStatus.NOT_FOUND);
      }

      await invoice.destroy();
      return { message: 'Invoice deleted successfully' };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Failed to delete invoice',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
