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
exports.PayordersController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const payorders_service_1 = require("./payorders.service");
const payorders_dto_1 = require("./payorders.dto");
const pdf_service_1 = require("../pdf/pdf.service");
const auth_decorator_1 = require("../auth/auth.decorator");
let PayordersController = class PayordersController {
    constructor(payorderService, pdfService) {
        this.payorderService = payorderService;
        this.pdfService = pdfService;
    }
    async getPayorders(initDate, endDate) {
        return await this.payorderService.getPayorders(initDate, endDate);
    }
    async createPayorder(data, req) {
        const userId = req['user'].sub;
        return await this.payorderService.createPayorder(data, userId);
    }
    async generateReportPayorders(res, initDate, endDate) {
        const payorders = await this.payorderService.getPayorders(initDate, endDate);
        const pdfName = `Reporte de Ordenes de Pago`;
        const buffer = await this.pdfService.generateReportPayorders(payorders, initDate, endDate);
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename=' + pdfName + '.pdf',
            'Content-Length': buffer.length,
        });
        res.end(buffer);
    }
    async updatePayorder(id, data, req) {
        const userId = req['user'].sub;
        return await this.payorderService.updatePayorder(id, data, userId);
    }
    async deletePayorder(id) {
        return await this.payorderService.deletePayorder(id);
    }
    async cancelPayorder(id) {
        return await this.payorderService.cancelPayorder(id);
    }
    async generatePayorder(id, res, req) {
        const host = req.get('host');
        const payorder = await this.payorderService.getPayorder(id);
        const pdfName = `Orden de Pago ${payorder.id}`;
        const buffer = await this.pdfService.generatePayorder(payorder, host);
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename=' + pdfName + '.pdf',
            'Content-Length': buffer.length,
        });
        res.end(buffer);
    }
    async getPayorder(id) {
        return await this.payorderService.getPayorder(id);
    }
};
exports.PayordersController = PayordersController;
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("./payorders.entity").Payorder] }),
    __param(0, (0, common_1.Query)('initDate')),
    __param(1, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PayordersController.prototype, "getPayorders", null);
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payorders_dto_1.createPayorderDto, Object]),
    __metadata("design:returntype", Promise)
], PayordersController.prototype, "createPayorder", null);
__decorate([
    (0, common_1.Get)('report/pdf'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('initDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], PayordersController.prototype, "generateReportPayorders", null);
__decorate([
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, payorders_dto_1.createPayorderDto, Object]),
    __metadata("design:returntype", Promise)
], PayordersController.prototype, "updatePayorder", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PayordersController.prototype, "deletePayorder", null);
__decorate([
    (0, common_1.Patch)(':id/cancelation'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PayordersController.prototype, "cancelPayorder", null);
__decorate([
    (0, auth_decorator_1.Public)(),
    (0, common_1.Get)(':id/pdf'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], PayordersController.prototype, "generatePayorder", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./payorders.entity").Payorder }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PayordersController.prototype, "getPayorder", null);
exports.PayordersController = PayordersController = __decorate([
    (0, common_1.Controller)('payorders'),
    __metadata("design:paramtypes", [payorders_service_1.PayordersService,
        pdf_service_1.PdfService])
], PayordersController);
//# sourceMappingURL=payorders.controller.js.map