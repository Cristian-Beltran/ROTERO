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
exports.ClassVehicleController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const class_vehicle_service_1 = require("./class-vehicle.service");
const class_vehicle_dto_1 = require("./class-vehicle.dto");
let ClassVehicleController = class ClassVehicleController {
    constructor(classVehicleService) {
        this.classVehicleService = classVehicleService;
    }
    async getClassVehicles() {
        return await this.classVehicleService.getClassVehicles();
    }
    async getClassVehicle(id) {
        return await this.classVehicleService.getClassVehicle(id);
    }
    async createClassVehicle(data, req) {
        const userId = req['user'].sub;
        return await this.classVehicleService.createClassVehicle(data, userId);
    }
    async updateClassVehicle(id, data, req) {
        const userId = req['user'].sub;
        return await this.classVehicleService.updateClassVehicle(id, data, userId);
    }
    async deleteClassVehicle(id) {
        return await this.classVehicleService.deleteClassVehicle(id);
    }
};
exports.ClassVehicleController = ClassVehicleController;
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("./class-vehicle.entity").ClassVehicle] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClassVehicleController.prototype, "getClassVehicles", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./class-vehicle.entity").ClassVehicle }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ClassVehicleController.prototype, "getClassVehicle", null);
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("./class-vehicle.entity").ClassVehicle }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [class_vehicle_dto_1.CreateClassVehicleDto, Object]),
    __metadata("design:returntype", Promise)
], ClassVehicleController.prototype, "createClassVehicle", null);
__decorate([
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./class-vehicle.entity").ClassVehicle }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, class_vehicle_dto_1.CreateClassVehicleDto, Object]),
    __metadata("design:returntype", Promise)
], ClassVehicleController.prototype, "updateClassVehicle", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ClassVehicleController.prototype, "deleteClassVehicle", null);
exports.ClassVehicleController = ClassVehicleController = __decorate([
    (0, common_1.Controller)('class-vehicle'),
    __metadata("design:paramtypes", [class_vehicle_service_1.ClassVehicleService])
], ClassVehicleController);
//# sourceMappingURL=class-vehicle.controller.js.map