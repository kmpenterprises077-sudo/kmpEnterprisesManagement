import { Employee } from './employee.model';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
export declare class EmployeesService {
    private readonly employeeModel;
    constructor(employeeModel: typeof Employee);
    findAll(): Promise<{
        id: number;
        name: string;
        role: string;
        phone: string;
        dailySalary: number;
        aadharNumber: string | null;
        dob: string | null;
        address: string | null;
        status: string | null;
        createdAt: any;
    }[]>;
    create(dto: CreateEmployeeDto): Promise<{
        id: number;
        name: string;
        role: string;
        phone: string;
        dailySalary: number;
        aadharNumber: string | null;
        dob: string | null;
        address: string | null;
        status: string | null;
        createdAt: any;
    }>;
    update(id: number, dto: UpdateEmployeeDto): Promise<{
        id: number;
        name: string;
        role: string;
        phone: string;
        dailySalary: number;
        aadharNumber: string | null;
        dob: string | null;
        address: string | null;
        status: string | null;
        createdAt: any;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
