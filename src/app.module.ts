import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.model';
import { Role } from './roles/role.model';
import { UserRole } from './roles/user-role.model';
import { UsersModule } from './users/users.module';
import { EmployeesModule } from './employees/employees.module';
import { SitesModule } from './sites/sites.module';
import { AttendanceModule } from './attendance/attendance.module';
import { SalaryAdvancesModule } from './salary-advances/salary-advances.module';
import { WorksheetsModule } from './worksheets/worksheets.module';
import { EmployeeSitesModule } from './employee-sites/employee-sites.module';
import { InvoicesModule } from './invoices/invoices.module';
import { Employee } from './employees/employee.model';
import { Site } from './sites/site.model';
import { Attendance } from './attendance/attendance.model';
import { SalaryAdvance } from './salary-advances/salary-advance.model';
import { Worksheet } from './worksheets/worksheet.model';
import { EmployeeSite } from './employee-sites/employee-site.model';
import { Invoice } from './invoices/invoice.model';

const env = (
  config: ConfigService,
  key: string,
  fallback?: string,
): string | undefined => {
  const value = config.get<string>(key);
  const trimmed = value?.trim();

  return trimmed || fallback;
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        dialect: 'mysql',
        host: env(config, 'DB_HOST', 'localhost'),
        port: Number(env(config, 'DB_PORT', '3306')),
        username: env(config, 'DB_USER') || env(config, 'DB_USERNAME'),
        password: env(config, 'DB_PASSWORD'),
        database: env(config, 'DB_NAME'),
        autoLoadModels: true,
        synchronize: env(config, 'DB_SYNC') === 'true',
        models: [
          User,
          Role,
          UserRole,
          Employee,
          Site,
          Attendance,
          SalaryAdvance,
          Worksheet,
          EmployeeSite,
          Invoice,
        ],
      }),
    }),
    AuthModule,
    UsersModule,
    EmployeesModule,
    SitesModule,
    AttendanceModule,
    SalaryAdvancesModule,
    WorksheetsModule,
    EmployeeSitesModule,
    InvoicesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
