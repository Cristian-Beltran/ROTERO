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
exports.DriversController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const drivers_service_1 = require("./drivers.service");
const drivers_dto_1 = require("./drivers.dto");
let DriversController = class DriversController {
    constructor(driverService) {
        this.driverService = driverService;
    }
    async getDrivers(id) {
        return await this.driverService.getDrivers(id);
    }
    async getDriver(id) {
        return await this.driverService.getDriver(id);
    }
    async createDriver(data, req) {
        const userId = req['user'].sub;
        return await this.driverService.createDriver(data, userId);
    }
    async updateDriver(id, data, req) {
        const userId = req['user'].sub;
        return await this.driverService.updateDriver(id, data, userId);
    }
    async deleteDriver(id) {
        return await this.driverService.deleteDriver(id);
    }
};
exports.DriversController = DriversController;
__decorate([
    (0, common_1.Get)(':id/operators'),
    openapi.ApiResponse({ status: 200, type: [require("./drivers.entity").Driver] }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DriversController.prototype, "getDrivers", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./drivers.entity").Driver }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DriversController.prototype, "getDriver", null);
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("./drivers.entity").Driver }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [drivers_dto_1.createDriverDto, Object]),
    __metadata("design:returntype", Promise)
], DriversController.prototype, "createDriver", null);
__decorate([
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./drivers.entity").Driver }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, drivers_dto_1.updateDriverDto, Object]),
    __metadata("design:returntype", Promise)
], DriversController.prototype, "updateDriver", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./drivers.entity").Driver }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DriversController.prototype, "deleteDriver", null);
exports.DriversController = DriversController = __decorate([
    (0, common_1.Controller)('drivers'),
    __metadata("design:paramtypes", [drivers_service_1.DriversService])
], DriversController);
//# sourceMappingURL=drivers.controller.js.map