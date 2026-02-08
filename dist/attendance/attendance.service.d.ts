import { Attendance } from './attendance.model';
import { Employee } from '../employees/employee.model';
import { Site } from '../sites/site.model';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
export declare class AttendanceService {
    private readonly attendanceModel;
    private readonly employeeModel;
    private readonly siteModel;
    constructor(attendanceModel: typeof Attendance, employeeModel: typeof Employee, siteModel: typeof Site);
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
    update(id: number, dto: UpdateAttendanceDto): Promise<{
        id: number;
        date: string;
        status: string;
        dayType: string | null;
        employeeId: number;
        siteId: number | null;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
