import { Model } from 'sequelize-typescript';
import { Employee } from '../employees/employee.model';
import { Site } from '../sites/site.model';
export interface AttendanceCreationAttributes {
    date: string;
    status: string;
    dayType?: string;
    employeeId: number;
    siteId?: number | null;
}
export declare class Attendance extends Model<Attendance, AttendanceCreationAttributes> {
    id: number;
    date: string;
    status: string;
    dayType: string | null;
    employeeId: number;
    siteId: number | null;
    employee?: Employee;
    site?: Site;
}
