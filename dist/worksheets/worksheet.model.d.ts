import { Model } from 'sequelize-typescript';
import { Employee } from '../employees/employee.model';
import { Site } from '../sites/site.model';
export interface WorksheetCreationAttributes {
    date: string;
    siteId: number;
    employeeId: number;
    description: string;
    workers?: number;
    supervisor?: string;
    status?: string;
}
export declare class Worksheet extends Model<Worksheet, WorksheetCreationAttributes> {
    id: number;
    date: string;
    siteId: number;
    employeeId: number;
    description: string;
    workers: number | null;
    supervisor: string | null;
    status: string | null;
    site?: Site;
    employee?: Employee;
}
