"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorksheetsController = void 0;
const common_1 = require("@nestjs/common");
const worksheets_service_1 = require("./worksheets.service");
const create_worksheet_dto_1 = require("./dto/create-worksheet.dto");
const update_worksheet_dto_1 = require("./dto/update-worksheet.dto");
let WorksheetsController = class WorksheetsController {
    worksheetsService;
    constructor(worksheetsService) {
        this.worksheetsService = worksheetsService;
    }
    async findAll() {
        try {
            return await this.worksheetsService.findAll();
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException('Unexpected error in worksheets', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async create(dto) {
        try {
            return await this.worksheetsService.create(dto);
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException('Unexpected error in create worksheet', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, dto) {
        try {
            return await this.worksheetsService.update(Number(id), dto);
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException('Unexpected error in update worksheet', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        try {
            return await this.worksheetsService.remove(Number(id));
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException('Unexpected error in delete worksheet', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.WorksheetsController = WorksheetsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WorksheetsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_worksheet_dto_1.CreateWorksheetDto]),
    __metadata("design:returntype", Promise)
], WorksheetsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_worksheet_dto_1.UpdateWorksheetDto]),
    __metadata("design:returntype", Promise)
], WorksheetsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WorksheetsController.prototype, "remove", null);
exports.WorksheetsController = WorksheetsController = __decorate([
    (0, common_1.Controller)('worksheets'),
    __metadata("design:paramtypes", [worksheets_service_1.WorksheetsService])
], WorksheetsController);
//# sourceMappingURL=worksheets.controller.js.map