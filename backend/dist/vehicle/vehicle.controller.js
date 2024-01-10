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
exports.VehicleController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const vehicle_service_1 = require("./vehicle.service");
const vehicle_dto_1 = require("./vehicle.dto");
const auth_decorator_1 = require("../auth/auth.decorator");
const pdf_service_1 = require("../pdf/pdf.service");
let VehicleController = class VehicleController {
    constructor(vehicleService, pdfService) {
        this.vehicleService = vehicleService;
        this.pdfService = pdfService;
    }
    async getVehicleForClass() {
        return await this.vehicleService.getVehicleForClass();
    }
    async getVehicleByPlate(plate) {
        return await this.vehicleService.getVehicleByPlate(plate);
    }
    async getVehicles(id) {
        return await this.vehicleService.getVehicles(id);
    }
    async getVehicle(id) {
        return await this.vehicleService.getVehicle(id);
    }
    async createVehicle(data, req) {
        const userId = req['user'].sub;
        return await this.vehicleService.createVehicle(data, userId);
    }
    async updateVehicle(id, data, req) {
        const userId = req['user'].sub;
        return await this.vehicleService.updateVehicle(id, data, userId);
    }
    async deleteVehicle(id) {
        return await this.vehicleService.deleteVehicle(id);
    }
    async generateCertificateOperator(id, res) {
        const vehicle = await this.vehicleService.getVehicle(id);
        if (!vehicle)
            throw new common_1.HttpException('Vehiculo no encontrado', common_1.HttpStatus.NOT_FOUND);
        const pdfName = `Certificado de operación ${vehicle.plate}`;
        const buffer = await this.pdfService.generateCertificateOperator(vehicle);
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename=' + pdfName + '.pdf',
            'Content-Length': buffer.length,
        });
        res.end(buffer);
    }
};
exports.VehicleController = VehicleController;
__decorate([
    (0, auth_decorator_1.Public)(),
    (0, common_1.Get)('classVehicle'),
    openapi.ApiResponse({ status: 200, type: [require("./vehicle.entity").Vehicle] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VehicleController.prototype, "getVehicleForClass", null);
__decorate([
    (0, common_1.Get)(':plate/plate'),
    openapi.ApiResponse({ status: 200, type: require("./vehicle.entity").Vehicle }),
    __param(0, (0, common_1.Param)('plate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VehicleController.prototype, "getVehicleByPlate", null);
__decorate([
    (0, common_1.Get)(':id/operator'),
    openapi.ApiResponse({ status: 200, type: [require("./vehicle.entity").Vehicle] }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], VehicleController.prototype, "getVehicles", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./vehicle.entity").Vehicle }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], VehicleController.prototype, "getVehicle", null);
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("./vehicle.entity").Vehicle }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vehicle_dto_1.CreateVehicleDto, Object]),
    __metadata("design:returntype", Promise)
], VehicleController.prototype, "createVehicle", null);
__decorate([
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./vehicle.entity").Vehicle }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, vehicle_dto_1.UpdateVehicleDto, Object]),
    __metadata("design:returntype", Promise)
], VehicleController.prototype, "updateVehicle", null);
__decorate([
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], VehicleController.prototype, "deleteVehicle", null);
__decorate([
    (0, auth_decorator_1.Public)(),
    (0, common_1.Get)(':id/pdf'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], VehicleController.prototype, "generateCertificateOperator", null);
exports.VehicleController = VehicleController = __decorate([
    (0, common_1.Controller)('vehicle'),
    __metadata("design:paramtypes", [vehicle_service_1.VehicleService,
        pdf_service_1.PdfService])
], VehicleController);
//# sourceMappingURL=vehicle.controller.js.map