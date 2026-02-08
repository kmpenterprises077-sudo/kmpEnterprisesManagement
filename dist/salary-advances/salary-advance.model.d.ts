import { Model } from 'sequelize-typescript';
import { Employee } from '../employees/employee.model';
export interface SalaryAdvanceCreationAttributes {
    employeeId: number;
    amount: number;
    date: string;
    note?: string;
}
export declare class SalaryAdvance extends Model<SalaryAdvance, SalaryAdvanceCreationAttributes> {
    id: number;
    employeeId: number;
    amount: number;
    date: string;
    note: string | null;
    employee?: Employee;
}
