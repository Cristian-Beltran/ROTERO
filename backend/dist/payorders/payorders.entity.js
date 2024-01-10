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
exports.Payorder = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const users_entity_1 = require("../users/users.entity");
const operators_entity_1 = require("../operators/operators.entity");
const type_payorders_entity_1 = require("../type-payorders/type-payorders.entity");
let Payorder = class Payorder {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, detail: { required: true, type: () => String }, cancellationDate: { required: true, type: () => Date }, cancellation: { required: true, type: () => Boolean }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, operator: { required: true, type: () => require("../operators/operators.entity").Operator }, user: { required: true, type: () => require("../users/users.entity").User }, typePayorder: { required: true, type: () => require("../type-payorders/type-payorders.entity").TypePayorder } };
    }
};
exports.Payorder = Payorder;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Payorder.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Payorder.prototype, "detail", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: null }),
    __metadata("design:type", Date)
], Payorder.prototype, "cancellationDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Payorder.prototype, "cancellation", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Payorder.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Payorder.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => operators_entity_1.Operator, (operator) => operator.payorders, {
        cascade: false,
    }),
    __metadata("design:type", operators_entity_1.Operator)
], Payorder.prototype, "operator", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.User, (user) => user.payordersUpdate, { cascade: false }),
    __metadata("design:type", users_entity_1.User)
], Payorder.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => type_payorders_entity_1.TypePayorder),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", type_payorders_entity_1.TypePayorder)
], Payorder.prototype, "typePayorder", void 0);
exports.Payorder = Payorder = __decorate([
    (0, typeorm_1.Entity)()
], Payorder);
//# sourceMappingURL=payorders.entity.js.map