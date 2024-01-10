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
exports.OwnersController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const owners_service_1 = require("./owners.service");
const owners_dto_1 = require("./owners.dto");
let OwnersController = class OwnersController {
    constructor(ownerService) {
        this.ownerService = ownerService;
    }
    async getOwners(operatorId) {
        return await this.ownerService.getOwners(operatorId);
    }
    async getOwner(id) {
        return await this.ownerService.getOwner(id);
    }
    async createOwner(data, req) {
        const userId = req['user'].sub;
        return await this.ownerService.createOwner(data, userId);
    }
    async updateOwner(id, data, req) {
        const userId = req['user'].sub;
        return await this.ownerService.updateOwner(id, data, userId);
    }
    async deleteOwner(id) {
        return await this.ownerService.deleteOwner(id);
    }
};
exports.OwnersController = OwnersController;
__decorate([
    (0, common_1.Get)(':operatorId/operator'),
    openapi.ApiResponse({ status: 200, type: [require("./owners.entity").Owner] }),
    __param(0, (0, common_1.Param)('operatorId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OwnersController.prototype, "getOwners", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./owners.entity").Owner }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OwnersController.prototype, "getOwner", null);
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [owners_dto_1.createOwnerDto, Object]),
    __metadata("design:returntype", Promise)
], OwnersController.prototype, "createOwner", null);
__decorate([
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, owners_dto_1.updateOwnerDto, Object]),
    __metadata("design:returntype", Promise)
], OwnersController.prototype, "updateOwner", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OwnersController.prototype, "deleteOwner", null);
exports.OwnersController = OwnersController = __decorate([
    (0, common_1.Controller)('owners'),
    __metadata("design:paramtypes", [owners_service_1.OwnersService])
], OwnersController);
//# sourceMappingURL=owners.controller.js.map