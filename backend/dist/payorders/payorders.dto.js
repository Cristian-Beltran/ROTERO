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
Object.defineProperty(exports, "__esModule", { value: true });
exports.detailPayorder = exports.updatePayorderDto = exports.createPayorderDto = void 0;
const openapi = require("@nestjs/swagger");
const mapped_types_1 = require("@nestjs/mapped-types");
const class_validator_1 = require("class-validator");
class createPayorderDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { reason: { required: true, type: () => String }, detail: { required: true, type: () => String }, operatorId: { required: true, type: () => Number }, amountExtra: { required: true, type: () => Number }, detailExtra: { required: true, type: () => String }, detailPayorders: { required: true, type: () => [require("./payorders.dto").detailPayorder] } };
    }
}
exports.createPayorderDto = createPayorderDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], createPayorderDto.prototype, "reason", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], createPayorderDto.prototype, "detail", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], createPayorderDto.prototype, "operatorId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], createPayorderDto.prototype, "amountExtra", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], createPayorderDto.prototype, "detailExtra", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], createPayorderDto.prototype, "detailPayorders", void 0);
class updatePayorderDto extends (0, mapped_types_1.PartialType)(createPayorderDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.updatePayorderDto = updatePayorderDto;
class detailPayorder {
    static _OPENAPI_METADATA_FACTORY() {
        return { serviceId: { required: true, type: () => Number }, count: { required: true, type: () => Number } };
    }
}
exports.detailPayorder = detailPayorder;
//# sourceMappingURL=payorders.dto.js.map