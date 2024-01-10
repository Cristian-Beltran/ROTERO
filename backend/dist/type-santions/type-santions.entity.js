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
exports.TypeSantion = exports.Severity = void 0;
const openapi = require("@nestjs/swagger");
const type_payorders_entity_1 = require("../type-payorders/type-payorders.entity");
const users_entity_1 = require("../users/users.entity");
const typeorm_1 = require("typeorm");
var Severity;
(function (Severity) {
    Severity["LEVE"] = "LEVE";
    Severity["GRAVE"] = "GRAVE";
    Severity["MUY_GRAVE"] = "MUY GRAVE";
})(Severity || (exports.Severity = Severity = {}));
let TypeSantion = class TypeSantion {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, detail: { required: true, type: () => String }, severity: { required: true, enum: require("./type-santions.entity").Severity }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, user: { required: true, type: () => require("../users/users.entity").User }, typePayorder: { required: true, type: () => require("../type-payorders/type-payorders.entity").TypePayorder } };
    }
};
exports.TypeSantion = TypeSantion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TypeSantion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TypeSantion.prototype, "detail", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TypeSantion.prototype, "severity", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], TypeSantion.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], TypeSantion.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.User, (user) => user.typeSantionsUpdate, { cascade: false }),
    __metadata("design:type", users_entity_1.User)
], TypeSantion.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => type_payorders_entity_1.TypePayorder),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", type_payorders_entity_1.TypePayorder)
], TypeSantion.prototype, "typePayorder", void 0);
exports.TypeSantion = TypeSantion = __decorate([
    (0, typeorm_1.Entity)()
], TypeSantion);
//# sourceMappingURL=type-santions.entity.js.map