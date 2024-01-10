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
exports.RossetesController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const rossetes_service_1 = require("./rossetes.service");
const rossetes_dto_1 = require("./rossetes.dto");
const pdf_service_1 = require("../pdf/pdf.service");
let RossetesController = class RossetesController {
    constructor(rosseteService, pdfService) {
        this.rosseteService = rosseteService;
        this.pdfService = pdfService;
    }
    async getRossetes() {
        return await this.rosseteService.getRossetes();
    }
    async readQrRossete(token, req) {
        const userId = req['user'].sub;
        return await this.rosseteService.readQrRossete(token, userId);
    }
    async getRossete(id) {
        return await this.rosseteService.getRossete(id);
    }
    async createRossete(data, req) {
        const userId = req['user'].sub;
        return await this.rosseteService.createRossete(data, userId);
    }
    async updateRossete(data, req, id) {
        const userId = req['user'].sub;
        return await this.rosseteService.updateRossete(id, data, userId);
    }
    async deleteRossete(id) {
        return await this.rosseteService.deleteRossete(id);
    }
    async generateRossete(id, res) {
        const rossete = await this.rosseteService.getRossete(id);
        const pdfName = `Roseta ${rossete.id}`;
        const buffer = await this.pdfService.generateRossete(id);
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename=' + pdfName + '.pdf',
            'Content-Length': buffer.length,
        });
        res.end(buffer);
    }
};
exports.RossetesController = RossetesController;
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("./rossetes.entity").Rossete] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RossetesController.prototype, "getRossetes", null);
__decorate([
    (0, common_1.Get)(':token/qr'),
    openapi.ApiResponse({ status: 200, type: require("./rossetes.entity").Rossete }),
    __param(0, (0, common_1.Param)('token')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RossetesController.prototype, "readQrRossete", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./rossetes.entity").Rossete }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RossetesController.prototype, "getRossete", null);
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("./rossetes.entity").Rossete }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [rossetes_dto_1.CreateRosseteDto, Object]),
    __metadata("design:returntype", Promise)
], RossetesController.prototype, "createRossete", null);
__decorate([
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./rossetes.entity").Rossete }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [rossetes_dto_1.UpdateRosseteDto, Object, Number]),
    __metadata("design:returntype", Promise)
], RossetesController.prototype, "updateRossete", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200, type: Boolean }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RossetesController.prototype, "deleteRossete", null);
__decorate([
    (0, common_1.Get)(':id/pdf'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], RossetesController.prototype, "generateRossete", null);
exports.RossetesController = RossetesController = __decorate([
    (0, common_1.Controller)('rossetes'),
    __metadata("design:paramtypes", [rossetes_service_1.RossetesService,
        pdf_service_1.PdfService])
], RossetesController);
//# sourceMappingURL=rossetes.controller.js.map