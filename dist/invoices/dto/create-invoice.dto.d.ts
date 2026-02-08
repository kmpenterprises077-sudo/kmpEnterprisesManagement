export declare class CreateInvoiceDto {
    type: string;
    employeeId?: number | null;
    siteId?: number | null;
    dateRange: string;
    amount: number;
    status: string;
    generatedDate: string;
    paidDate?: string | null;
    details?: any;
}
