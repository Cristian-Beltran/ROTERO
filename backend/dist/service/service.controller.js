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
exports.ServiceController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const service_service_1 = require("./service.service");
const service_dto_1 = require("./service.dto");
let ServiceController = class ServiceController {
    constructor(serviceService) {
        this.serviceService = serviceService;
    }
    async getServices(type) {
        return await this.serviceService.getServices(type);
    }
    async getService(id) {
        return await this.serviceService.getService(id);
    }
    async createService(data, request) {
        const userId = request['user'].sub;
        return await this.serviceService.createService(data, userId);
    }
    async updateService(id, data, request) {
        const userId = request['user'].sub;
        return await this.serviceService.updateService(id, data, userId);
    }
    async deleteService(id) {
        return await this.serviceService.deleteService(id);
    }
};
exports.ServiceController = ServiceController;
__decorate([
    (0, common_1.Get)(':type/type'),
    openapi.ApiResponse({ status: 200, type: [require("./service.entity").Service] }),
    __param(0, (0, common_1.Param)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ServiceController.prototype, "getServices", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./service.entity").Service }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ServiceController.prototype, "getService", null);
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("./service.entity").Service }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [service_dto_1.createServiceDto, Object]),
    __metadata("design:returntype", Promise)
], ServiceController.prototype, "createService", null);
__decorate([
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./service.entity").Service }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, service_dto_1.updateServiceDto, Object]),
    __metadata("design:returntype", Promise)
], ServiceController.prototype, "updateService", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./service.entity").Service }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ServiceController.prototype, "deleteService", null);
exports.ServiceController = ServiceController = __decorate([
    (0, common_1.Controller)('service'),
    __metadata("design:paramtypes", [service_service_1.ServiceService])
], ServiceController);
//# sourceMappingURL=service.controller.js.map