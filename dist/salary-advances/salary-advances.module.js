"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalaryAdvancesModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const salary_advances_controller_1 = require("./salary-advances.controller");
const salary_advances_service_1 = require("./salary-advances.service");
const salary_advance_model_1 = require("./salary-advance.model");
const employee_model_1 = require("../employees/employee.model");
let SalaryAdvancesModule = class SalaryAdvancesModule {
};
exports.SalaryAdvancesModule = SalaryAdvancesModule;
exports.SalaryAdvancesModule = SalaryAdvancesModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([salary_advance_model_1.SalaryAdvance, employee_model_1.Employee])],
        controllers: [salary_advances_controller_1.SalaryAdvancesController],
        providers: [salary_advances_service_1.SalaryAdvancesService],
    })
], SalaryAdvancesModule);
//# sourceMappingURL=salary-advances.module.js.map