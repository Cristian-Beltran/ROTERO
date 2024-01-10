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
exports.OperatorsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const operators_service_1 = require("./operators.service");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
let OperatorsController = class OperatorsController {
    constructor(operatorService, cloudinaryService) {
        this.operatorService = operatorService;
        this.cloudinaryService = cloudinaryService;
    }
    async getTotalEmployeeOperators() {
        return await this.operatorService.getTotalEmployeeOperators();
    }
    async getOperators() {
        return await this.operatorService.getOperators();
    }
    async deleteOperator(id) {
        return await this.operatorService.deleteOperator(id);
    }
    async authorizeOperator(id) {
        return await this.operatorService.authorizeOperator(id);
    }
    async getOperator(id) {
        return await this.operatorService.getOperator(id);
    }
    async createOperator(data, request) {
        const userId = request['user'].sub;
        return await this.operatorService.createOperator(data.operator, data.operatorUser, userId);
    }
    async updateOperator(id, data, request) {
        const userId = request['user'].sub;
        return await this.operatorService.updateOperator(id, data.operator, data.operatorUser, userId);
    }
    async uploadFiles(id, file, params) {
        const cloudinary = await this.cloudinaryService.uploadFile(file);
        const secure_url = cloudinary.secure_url;
        return await this.operatorService.uploadFiles(id, secure_url, params.location);
    }
};
exports.OperatorsController = OperatorsController;
__decorate([
    (0, common_1.Get)('total-affiliates'),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OperatorsController.prototype, "getTotalEmployeeOperators", null);
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("./operators.entity").Operator] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OperatorsController.prototype, "getOperators", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200, type: Boolean }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OperatorsController.prototype, "deleteOperator", null);
__decorate([
    (0, common_1.Patch)(':id/authorize'),
    openapi.ApiResponse({ status: 200, type: Boolean }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OperatorsController.prototype, "authorizeOperator", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./operators.entity").Operator }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OperatorsController.prototype, "getOperator", null);
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OperatorsController.prototype, "createOperator", null);
__decorate([
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], OperatorsController.prototype, "updateOperator", null);
__decorate([
    (0, common_1.Patch)(':id/files'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], OperatorsController.prototype, "uploadFiles", null);
exports.OperatorsController = OperatorsController = __decorate([
    (0, common_1.Controller)('operators'),
    __metadata("design:paramtypes", [operators_service_1.OperatorsService,
        cloudinary_service_1.CloudinaryService])
], OperatorsController);
//# sourceMappingURL=operators.controller.js.map