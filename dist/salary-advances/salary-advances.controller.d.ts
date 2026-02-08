import { SalaryAdvancesService } from './salary-advances.service';
import { CreateSalaryAdvanceDto } from './dto/create-salary-advance.dto';
export declare class SalaryAdvancesController {
    private readonly salaryAdvancesService;
    constructor(salaryAdvancesService: SalaryAdvancesService);
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
    remove(id: string): Promise<{
        message: string;
    }>;
}
