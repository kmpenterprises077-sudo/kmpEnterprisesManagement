import { Model } from 'sequelize-typescript';
export interface EmployeeCreationAttributes {
    name: string;
    role: string;
    phone: string;
    dailySalary: number;
    aadharNumber?: string;
    dob?: string;
    address?: string;
    status?: string;
}
export declare class Employee extends Model<Employee, EmployeeCreationAttributes> {
    id: number;
    name: string;
    role: string;
    phone: string;
    dailySalary: number;
    aadharNumber: string | null;
    dob: string | null;
    address: string | null;
    status: string | null;
}
