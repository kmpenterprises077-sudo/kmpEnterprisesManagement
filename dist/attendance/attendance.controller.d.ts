import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
export declare class AttendanceController {
    private readonly attendanceService;
    constructor(attendanceService: AttendanceService);
    findAll(): Promise<{
        id: number;
        date: string;
        status: string;
        dayType: string | null;
        employeeId: number;
        siteId: number | null;
        employeeName: string | null;
        siteName: string | null;
    }[]>;
    create(dto: CreateAttendanceDto): Promise<{
        id: number;
        date: string;
        status: string;
        dayType: string | null;
        employeeId: number;
        siteId: number | null;
    }>;
    update(id: string, dto: UpdateAttendanceDto): Promise<{
        id: number;
        date: string;
        status: string;
        dayType: string | null;
        employeeId: number;
        siteId: number | null;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
