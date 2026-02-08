"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorksheetsModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const worksheets_controller_1 = require("./worksheets.controller");
const worksheets_service_1 = require("./worksheets.service");
const worksheet_model_1 = require("./worksheet.model");
const employee_model_1 = require("../employees/employee.model");
const site_model_1 = require("../sites/site.model");
let WorksheetsModule = class WorksheetsModule {
};
exports.WorksheetsModule = WorksheetsModule;
exports.WorksheetsModule = WorksheetsModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([worksheet_model_1.Worksheet, employee_model_1.Employee, site_model_1.Site])],
        controllers: [worksheets_controller_1.WorksheetsController],
        providers: [worksheets_service_1.WorksheetsService],
    })
], WorksheetsModule);
//# sourceMappingURL=worksheets.module.js.map