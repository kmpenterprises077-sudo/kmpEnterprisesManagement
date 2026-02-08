"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeSitesModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const employee_sites_controller_1 = require("./employee-sites.controller");
const employee_sites_service_1 = require("./employee-sites.service");
const employee_site_model_1 = require("./employee-site.model");
const employee_model_1 = require("../employees/employee.model");
const site_model_1 = require("../sites/site.model");
let EmployeeSitesModule = class EmployeeSitesModule {
};
exports.EmployeeSitesModule = EmployeeSitesModule;
exports.EmployeeSitesModule = EmployeeSitesModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([employee_site_model_1.EmployeeSite, employee_model_1.Employee, site_model_1.Site])],
        controllers: [employee_sites_controller_1.EmployeeSitesController],
        providers: [employee_sites_service_1.EmployeeSitesService],
    })
], EmployeeSitesModule);
//# sourceMappingURL=employee-sites.module.js.map