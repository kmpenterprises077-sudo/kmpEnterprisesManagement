import { SalaryAdvance } from './salary-advance.model';
import { Employee } from '../employees/employee.model';
import { CreateSalaryAdvanceDto } from './dto/create-salary-advance.dto';
export declare class SalaryAdvancesService {
    private readonly advanceModel;
    private readonly employeeModel;
    constructor(advanceModel: typeof SalaryAdvance, employeeModel: typeof Employee);
    findAll(): Promise<{
        id: number;
        employeeId: number;
        amount: number;
        date: string;
        note: string | null;
        employeeName: string | null;
    }[]>;
    create(dto: CreateSalaryAdvanceDto): Promise<{
        id: number;
        employeeId: number;
        amount: number;
        date: string;
        note: string | null;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
