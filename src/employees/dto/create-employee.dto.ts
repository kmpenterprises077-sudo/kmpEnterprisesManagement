export class CreateEmployeeDto {
  name: string;
  role: string;
  phone: string;
  dailySalary: number;
  aadharNumber?: string;
  dob?: string;
  address?: string;
  status?: string;
}
