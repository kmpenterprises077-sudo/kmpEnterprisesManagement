"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const sequelize_1 = require("@nestjs/sequelize");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const user_model_1 = require("./users/user.model");
const role_model_1 = require("./roles/role.model");
const user_role_model_1 = require("./roles/user-role.model");
const users_module_1 = require("./users/users.module");
const employees_module_1 = require("./employees/employees.module");
const sites_module_1 = require("./sites/sites.module");
const attendance_module_1 = require("./attendance/attendance.module");
const salary_advances_module_1 = require("./salary-advances/salary-advances.module");
const worksheets_module_1 = require("./worksheets/worksheets.module");
const employee_sites_module_1 = require("./employee-sites/employee-sites.module");
const invoices_module_1 = require("./invoices/invoices.module");
const employee_model_1 = require("./employees/employee.model");
const site_model_1 = require("./sites/site.model");
const attendance_model_1 = require("./attendance/attendance.model");
const salary_advance_model_1 = require("./salary-advances/salary-advance.model");
const worksheet_model_1 = require("./worksheets/worksheet.model");
const employee_site_model_1 = require("./employee-sites/employee-site.model");
const invoice_model_1 = require("./invoices/invoice.model");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            sequelize_1.SequelizeModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    dialect: 'mysql',
                    host: config.get('DB_HOST') || 'localhost',
                    port: Number(config.get('DB_PORT') || 3306),
                    username: config.get('DB_USER'),
                    password: config.get('DB_PASSWORD'),
                    database: config.get('DB_NAME'),
                    autoLoadModels: true,
                    synchronize: true,
                    models: [
                        user_model_1.User,
                        role_model_1.Role,
                        user_role_model_1.UserRole,
                        employee_model_1.Employee,
                        site_model_1.Site,
                        attendance_model_1.Attendance,
                        salary_advance_model_1.SalaryAdvance,
                        worksheet_model_1.Worksheet,
                        employee_site_model_1.EmployeeSite,
                        invoice_model_1.Invoice,
                    ],
                }),
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            employees_module_1.EmployeesModule,
            sites_module_1.SitesModule,
            attendance_module_1.AttendanceModule,
            salary_advances_module_1.SalaryAdvancesModule,
            worksheets_module_1.WorksheetsModule,
            employee_sites_module_1.EmployeeSitesModule,
            invoices_module_1.InvoicesModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map