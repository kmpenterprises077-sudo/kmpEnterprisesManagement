import { Worksheet } from './worksheet.model';
import { Employee } from '../employees/employee.model';
import { Site } from '../sites/site.model';
import { CreateWorksheetDto } from './dto/create-worksheet.dto';
import { UpdateWorksheetDto } from './dto/update-worksheet.dto';
export declare class WorksheetsService {
    private readonly worksheetModel;
    private readonly employeeModel;
    private readonly siteModel;
    constructor(worksheetModel: typeof Worksheet, employeeModel: typeof Employee, siteModel: typeof Site);
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
    update(id: number, dto: UpdateWorksheetDto): Promise<{
        id: number;
        date: string;
        siteId: number;
        employeeId: number;
        description: string;
        workers: number | null;
        supervisor: string | null;
        status: string | null;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
