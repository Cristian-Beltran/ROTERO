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
exports.Santion = void 0;
const openapi = require("@nestjs/swagger");
const operators_entity_1 = require("../operators/operators.entity");
const payorders_entity_1 = require("../payorders/payorders.entity");
const type_santions_entity_1 = require("../type-santions/type-santions.entity");
const users_entity_1 = require("../users/users.entity");
const typeorm_1 = require("typeorm");
let Santion = class Santion {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, detail: { required: true, type: () => String }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, user: { required: true, type: () => require("../users/users.entity").User }, operator: { required: true, type: () => require("../operators/operators.entity").Operator }, payorder: { required: true, type: () => require("../payorders/payorders.entity").Payorder }, typeSantion: { required: true, type: () => require("../type-santions/type-santions.entity").TypeSantion } };
    }
};
exports.Santion = Santion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Santion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Santion.prototype, "detail", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Santion.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Santion.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.User, (user) => user.santionsUpdate, { cascade: false }),
    __metadata("design:type", users_entity_1.User)
], Santion.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => operators_entity_1.Operator, (operator) => operator.santions, {
        cascade: false,
    }),
    __metadata("design:type", operators_entity_1.Operator)
], Santion.prototype, "operator", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => payorders_entity_1.Payorder),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", payorders_entity_1.Payorder)
], Santion.prototype, "payorder", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => type_santions_entity_1.TypeSantion),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", type_santions_entity_1.TypeSantion)
], Santion.prototype, "typeSantion", void 0);
exports.Santion = Santion = __decorate([
    (0, typeorm_1.Entity)()
], Santion);
//# sourceMappingURL=santions.entity.js.map