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
exports.SantionsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const santions_service_1 = require("./santions.service");
const santions_dto_1 = require("./santions.dto");
let SantionsController = class SantionsController {
    constructor(santionsService) {
        this.santionsService = santionsService;
    }
    async getSantions(initDate, endDate) {
        return await this.santionsService.getSantions(initDate, endDate);
    }
    async getSantion(id) {
        return await this.santionsService.getSantion(id);
    }
    async createSantion(data, req) {
        const userId = req['user'].sub;
        return await this.santionsService.createSantion(data, userId);
    }
    async updateSantion(id, data, req) {
        const userId = req['user'].sub;
        return await this.santionsService.updateSantion(id, data, userId);
    }
    async deleteSantion(id) {
        return await this.santionsService.deleteSantion(id);
    }
};
exports.SantionsController = SantionsController;
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("./santions.entity").Santion] }),
    __param(0, (0, common_1.Query)('initDate')),
    __param(1, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SantionsController.prototype, "getSantions", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./santions.entity").Santion }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SantionsController.prototype, "getSantion", null);
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("./santions.entity").Santion }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [santions_dto_1.createSantionDto, Object]),
    __metadata("design:returntype", Promise)
], SantionsController.prototype, "createSantion", null);
__decorate([
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./santions.entity").Santion }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, santions_dto_1.createSantionDto, Object]),
    __metadata("design:returntype", Promise)
], SantionsController.prototype, "updateSantion", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200, type: Boolean }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SantionsController.prototype, "deleteSantion", null);
exports.SantionsController = SantionsController = __decorate([
    (0, common_1.Controller)('santions'),
    __metadata("design:paramtypes", [santions_service_1.SantionsService])
], SantionsController);
//# sourceMappingURL=santions.controller.js.map