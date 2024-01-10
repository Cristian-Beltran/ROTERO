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
exports.TypePayordersController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const type_payorders_service_1 = require("./type-payorders.service");
const type_payorders_dto_1 = require("./type-payorders.dto");
let TypePayordersController = class TypePayordersController {
    constructor(typePayordersService) {
        this.typePayordersService = typePayordersService;
    }
    getTypePayorders() {
        return this.typePayordersService.getTypePayorders();
    }
    getTypePayorder(id) {
        return this.typePayordersService.getTypePayorder(id);
    }
    createTypePayorder(data, req) {
        const userId = req['user'].sub;
        return this.typePayordersService.createTypePayorder(userId, data);
    }
    updateTypePayorder(data, req, id) {
        const userId = req['user'].sub;
        return this.typePayordersService.updateTypePayorder(id, data, userId);
    }
    deleteTypePayorder(id) {
        return this.typePayordersService.deleteTypePayorder(id);
    }
};
exports.TypePayordersController = TypePayordersController;
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("./type-payorders.entity").TypePayorder] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TypePayordersController.prototype, "getTypePayorders", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./type-payorders.entity").TypePayorder }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TypePayordersController.prototype, "getTypePayorder", null);
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("./type-payorders.entity").TypePayorder }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [type_payorders_dto_1.CreateTypePayorderDto, Object]),
    __metadata("design:returntype", void 0)
], TypePayordersController.prototype, "createTypePayorder", null);
__decorate([
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./type-payorders.entity").TypePayorder }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [type_payorders_dto_1.CreateTypePayorderDto, Object, Number]),
    __metadata("design:returntype", void 0)
], TypePayordersController.prototype, "updateTypePayorder", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200, type: Boolean }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TypePayordersController.prototype, "deleteTypePayorder", null);
exports.TypePayordersController = TypePayordersController = __decorate([
    (0, common_1.Controller)('type-payorders'),
    __metadata("design:paramtypes", [type_payorders_service_1.TypePayordersService])
], TypePayordersController);
//# sourceMappingURL=type-payorders.controller.js.map