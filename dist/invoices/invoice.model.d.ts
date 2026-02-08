import { Model } from 'sequelize-typescript';
export interface InvoiceCreationAttributes {
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
export declare class Invoice extends Model<Invoice, InvoiceCreationAttributes> {
    id: number;
    type: string;
    employeeId: number | null;
    siteId: number | null;
    dateRange: string;
    amount: number;
    status: string;
    generatedDate: string;
    paidDate: string | null;
    details: any | null;
}
