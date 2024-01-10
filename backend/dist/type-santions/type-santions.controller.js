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
exports.TypeSantionsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const type_santions_service_1 = require("./type-santions.service");
const type_santions_dto_1 = require("./type-santions.dto");
let TypeSantionsController = class TypeSantionsController {
    constructor(typeSantionsService) {
        this.typeSantionsService = typeSantionsService;
    }
    async getTypeSantions() {
        return await this.typeSantionsService.getTypeSantions();
    }
    async getTypeSantion(id) {
        return await this.typeSantionsService.getTypeSantion(id);
    }
    async createTypeSantion(data, req) {
        const userId = req['user'].sub;
        return await this.typeSantionsService.createTypeSantion(data, userId);
    }
    async updateTypeSantion(id, data, req) {
        const userId = req['user'].sub;
        return await this.typeSantionsService.updateTypeSantion(id, data, userId);
    }
    async deleteTypeSantion(id) {
        return await this.typeSantionsService.deleteTypeSantion(id);
    }
};
exports.TypeSantionsController = TypeSantionsController;
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("./type-santions.entity").TypeSantion] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TypeSantionsController.prototype, "getTypeSantions", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./type-santions.entity").TypeSantion }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TypeSantionsController.prototype, "getTypeSantion", null);
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("./type-santions.entity").TypeSantion }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [type_santions_dto_1.createTypeSantionDto, Object]),
    __metadata("design:returntype", Promise)
], TypeSantionsController.prototype, "createTypeSantion", null);
__decorate([
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./type-santions.entity").TypeSantion }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, type_santions_dto_1.updateTypeSantionDto, Object]),
    __metadata("design:returntype", Promise)
], TypeSantionsController.prototype, "updateTypeSantion", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200, type: Boolean }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TypeSantionsController.prototype, "deleteTypeSantion", null);
exports.TypeSantionsController = TypeSantionsController = __decorate([
    (0, common_1.Controller)('type-santions'),
    __metadata("design:paramtypes", [type_santions_service_1.TypeSantionsService])
], TypeSantionsController);
//# sourceMappingURL=type-santions.controller.js.map