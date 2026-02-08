import { EmployeeSite } from './employee-site.model';
import { Employee } from '../employees/employee.model';
import { Site } from '../sites/site.model';
import { CreateEmployeeSiteDto } from './dto/create-employee-site.dto';
export declare class EmployeeSitesService {
    private readonly employeeSiteModel;
    private readonly employeeModel;
    private readonly siteModel;
    constructor(employeeSiteModel: typeof EmployeeSite, employeeModel: typeof Employee, siteModel: typeof Site);
    findAll(): Promise<{
        id: number;
        employeeId: number;
        siteId: number;
        assignedAt: Date | null;
        employeeName: string | null;
        siteName: string | null;
    }[]>;
    findBySite(siteId: number): Promise<{
        id: number;
        employeeId: number;
        siteId: number;
        assignedAt: Date | null;
        employeeName: string | null;
        siteName: string | null;
    }[]>;
    findByEmployee(employeeId: number): Promise<{
        id: number;
        employeeId: number;
        siteId: number;
        assignedAt: Date | null;
        employeeName: string | null;
        siteName: string | null;
    }[]>;
    create(dto: CreateEmployeeSiteDto): Promise<{
        id: number;
        employeeId: number;
        siteId: number;
        assignedAt: Date | null;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
