import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
export declare class EmployeesController {
    private readonly employeesService;
    constructor(employeesService: EmployeesService);
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
    update(id: string, dto: UpdateEmployeeDto): Promise<{
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
    remove(id: string): Promise<{
        message: string;
    }>;
}
