import { Model } from 'sequelize-typescript';
import { Employee } from '../employees/employee.model';
import { Site } from '../sites/site.model';
export interface EmployeeSiteCreationAttributes {
    employeeId: number;
    siteId: number;
    assignedAt?: Date;
}
export declare class EmployeeSite extends Model<EmployeeSite, EmployeeSiteCreationAttributes> {
    id: number;
    employeeId: number;
    siteId: number;
    assignedAt: Date | null;
    employee?: Employee;
    site?: Site;
}
