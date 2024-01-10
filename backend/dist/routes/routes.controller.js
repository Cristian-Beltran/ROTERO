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
exports.RoutesController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const routes_service_1 = require("./routes.service");
const routes_dto_1 = require("./routes.dto");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
const platform_express_1 = require("@nestjs/platform-express");
let RoutesController = class RoutesController {
    constructor(routeService, cloudinaryService) {
        this.routeService = routeService;
        this.cloudinaryService = cloudinaryService;
    }
    async getRoutes() {
        return await this.routeService.getRoutes();
    }
    async getRoute(id) {
        return await this.routeService.getRoute(id);
    }
    async createRoute(data, req) {
        const userId = req['user'].sub;
        return await this.routeService.createRoute(data, userId);
    }
    async updateRoute(id, data, req) {
        const userId = req['user'].sub;
        return await this.routeService.updateRoute(id, data, userId);
    }
    async deleteRoute(id) {
        return await this.routeService.deleteRoute(id);
    }
    async uploadFiles(id, file) {
        const cloudinary = await this.cloudinaryService.uploadFile(file);
        const secure_url = cloudinary.secure_url;
        return await this.routeService.uploadFiles(id, secure_url);
    }
};
exports.RoutesController = RoutesController;
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("./routes.entity").Route] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RoutesController.prototype, "getRoutes", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./routes.entity").Route }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RoutesController.prototype, "getRoute", null);
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("./routes.entity").Route }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [routes_dto_1.CreateRouteDto, Object]),
    __metadata("design:returntype", Promise)
], RoutesController.prototype, "createRoute", null);
__decorate([
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./routes.entity").Route }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, routes_dto_1.CreateRouteDto, Object]),
    __metadata("design:returntype", Promise)
], RoutesController.prototype, "updateRoute", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RoutesController.prototype, "deleteRoute", null);
__decorate([
    (0, common_1.Patch)(':id/files'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    openapi.ApiResponse({ status: 200, type: Boolean }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], RoutesController.prototype, "uploadFiles", null);
exports.RoutesController = RoutesController = __decorate([
    (0, common_1.Controller)('routes'),
    __metadata("design:paramtypes", [routes_service_1.RoutesService,
        cloudinary_service_1.CloudinaryService])
], RoutesController);
//# sourceMappingURL=routes.controller.js.map