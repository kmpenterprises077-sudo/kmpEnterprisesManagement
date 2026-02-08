import { WorksheetsService } from './worksheets.service';
import { CreateWorksheetDto } from './dto/create-worksheet.dto';
import { UpdateWorksheetDto } from './dto/update-worksheet.dto';
export declare class WorksheetsController {
    private readonly worksheetsService;
    constructor(worksheetsService: WorksheetsService);
    findAll(): Promise<{
        id: number;
        date: string;
        siteId: number;
        employeeId: number;
        description: string;
        workers: number | null;
        supervisor: string | null;
        status: string | null;
        employeeName: string | null;
        siteName: string | null;
    }[]>;
    create(dto: CreateWorksheetDto): Promise<{
        id: number;
        date: string;
        siteId: number;
        employeeId: number;
        description: string;
        workers: number | null;
        supervisor: string | null;
        status: string | null;
    }>;
    update(id: string, dto: UpdateWorksheetDto): Promise<{
        id: number;
        date: string;
        siteId: number;
        employeeId: number;
        description: string;
        workers: number | null;
        supervisor: string | null;
        status: string | null;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
