import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
export declare class InvoicesController {
    private readonly invoicesService;
    constructor(invoicesService: InvoicesService);
    findAll(): Promise<{
        id: number;
        type: string;
        employeeId: number | null;
        siteId: number | null;
        dateRange: string;
        amount: number;
        status: string;
        generatedDate: string;
        paidDate: string | null;
        details: any;
        createdAt: any;
    }[]>;
    create(dto: CreateInvoiceDto): Promise<{
        id: number;
        type: string;
        employeeId: number | null;
        siteId: number | null;
        dateRange: string;
        amount: number;
        status: string;
        generatedDate: string;
        paidDate: string | null;
        details: any;
        createdAt: any;
    }>;
    update(id: string, dto: UpdateInvoiceDto): Promise<{
        id: number;
        type: string;
        employeeId: number | null;
        siteId: number | null;
        dateRange: string;
        amount: number;
        status: string;
        generatedDate: string;
        paidDate: string | null;
        details: any;
        createdAt: any;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
