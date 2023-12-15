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
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const operators_service_1 = require("./operators.service");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
let OperatorsController = class OperatorsController {
    constructor(operatorService, cloudinaryService) {
        this.operatorService = operatorService;
        this.cloudinaryService = cloudinaryService;
    }
    async getOperators() {
        return this.operatorService.getOperators();
    }
    async getOperator(id) {
        return this.operatorService.getOperator(id);
    }
    async createOperator(files, data, request) {
        const userId = request['user'].sub;
        if (files) {
            const filesPromises = files.map((file) => this.cloudinaryService.uploadFile(file));
            const filesResult = await Promise.all(filesPromises);
            filesResult.forEach((fileResult) => {
                const key = Object.keys(fileResult)[0];
                data.files[key] = fileResult[key];
            });
        }
        return this.operatorService.createOperator(data.operator, data.operatorUser, userId, data.files);
    }
    async updateOperator(files, id, data, request) {
        const userId = request['user'].sub;
        if (files) {
            const filesPromises = files.map((file) => this.cloudinaryService.uploadFile(file));
            const filesResult = await Promise.all(filesPromises);
            filesResult.forEach((fileResult) => {
                const key = Object.keys(fileResult)[0];
                data.files[key] = fileResult[key];
            });
        }
        return this.operatorService.updateOperator(id, data.operator, data.operatorUser, userId, data.files);
    }
};
exports.OperatorsController = OperatorsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OperatorsController.prototype, "getOperators", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OperatorsController.prototype, "getOperator", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 3)),
    __param(0, (0, common_1.Body)()),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object, Object]),
    __metadata("design:returntype", Promise)
], OperatorsController.prototype, "createOperator", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 3)),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Number, Object, Object]),
    __metadata("design:returntype", Promise)
], OperatorsController.prototype, "updateOperator", null);
exports.OperatorsController = OperatorsController = __decorate([
    (0, common_1.Controller)('operators'),
    __metadata("design:paramtypes", [operators_service_1.OperatorsService,
        cloudinary_service_1.CloudinaryService])
], OperatorsController);
//# sourceMappingURL=operators.controller.js.map