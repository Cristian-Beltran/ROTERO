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
exports.Service = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const users_entity_1 = require("../users/users.entity");
const service_dto_1 = require("./service.dto");
const detail_payorder_entity_1 = require("../payorders/detail_payorder.entity");
let Service = class Service {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, detail: { required: true, type: () => String }, amount: { required: true, type: () => Number }, type: { required: true, enum: require("./service.dto").ServiceType }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, user: { required: true, type: () => require("../users/users.entity").User }, detailPayorders: { required: true, type: () => [require("../payorders/detail_payorder.entity").DetailPayorder] } };
    }
};
exports.Service = Service;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Service.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Service.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Service.prototype, "detail", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Service.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Service.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Service.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Service.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.User, (user) => user.servicesUpdate, { cascade: false }),
    __metadata("design:type", users_entity_1.User)
], Service.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => detail_payorder_entity_1.DetailPayorder, (detailPayorder) => detailPayorder.service),
    __metadata("design:type", Array)
], Service.prototype, "detailPayorders", void 0);
exports.Service = Service = __decorate([
    (0, typeorm_1.Entity)()
], Service);
//# sourceMappingURL=service.entity.js.map