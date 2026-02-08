export class UpdateAttendanceDto {
  date?: string;
  status?: string;
  dayType?: string;
  employeeId?: number;
  siteId?: number | null;
}
