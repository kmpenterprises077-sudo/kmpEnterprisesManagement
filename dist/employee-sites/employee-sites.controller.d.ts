import { EmployeeSitesService } from './employee-sites.service';
import { CreateEmployeeSiteDto } from './dto/create-employee-site.dto';
export declare class EmployeeSitesController {
    private readonly employeeSitesService;
    constructor(employeeSitesService: EmployeeSitesService);
    findAll(): Promise<{
        id: number;
        employeeId: number;
        siteId: number;
        assignedAt: Date | null;
        employeeName: string | null;
        siteName: string | null;
    }[]>;
    findBySite(siteId: string): Promise<{
        id: number;
        employeeId: number;
        siteId: number;
        assignedAt: Date | null;
        employeeName: string | null;
        siteName: string | null;
    }[]>;
    findByEmployee(employeeId: string): Promise<{
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
    remove(id: string): Promise<{
        message: string;
    }>;
}
