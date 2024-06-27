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
exports.DetailPayorder = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const service_entity_1 = require("../service/service.entity");
const payorders_entity_1 = require("./payorders.entity");
let DetailPayorder = class DetailPayorder {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, count: { required: true, type: () => Number }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, service: { required: true, type: () => require("../service/service.entity").Service }, payorder: { required: true, type: () => require("./payorders.entity").Payorder } };
    }
};
exports.DetailPayorder = DetailPayorder;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DetailPayorder.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], DetailPayorder.prototype, "count", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], DetailPayorder.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], DetailPayorder.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => service_entity_1.Service, (service) => service.detailPayorders, {
        cascade: false,
    }),
    __metadata("design:type", service_entity_1.Service)
], DetailPayorder.prototype, "service", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => payorders_entity_1.Payorder, (payorder) => payorder.detailPayorders, {
        cascade: false,
    }),
    __metadata("design:type", payorders_entity_1.Payorder)
], DetailPayorder.prototype, "payorder", void 0);
exports.DetailPayorder = DetailPayorder = __decorate([
    (0, typeorm_1.Entity)()
], DetailPayorder);
//# sourceMappingURL=detail_payorder.entity.js.map