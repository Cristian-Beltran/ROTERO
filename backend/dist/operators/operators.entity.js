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
exports.Operator = exports.State = void 0;
const typeorm_1 = require("typeorm");
const users_entity_1 = require("../users/users.entity");
const payorders_entity_1 = require("../payorders/payorders.entity");
var State;
(function (State) {
    State["AUTORIZADO"] = "AUTIRIZADO";
    State["BAJA"] = "BAJA";
    State["PROCESO"] = "PROCESO";
})(State || (exports.State = State = {}));
let Operator = class Operator {
};
exports.Operator = Operator;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Operator.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Operator.prototype, "businessName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Operator.prototype, "legalRepresentative", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Operator.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Operator.prototype, "seprec", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Operator.prototype, "nit", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Operator.prototype, "administrativeResolution", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Operator.prototype, "dateRa", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer' }),
    __metadata("design:type", Number)
], Operator.prototype, "initialAffiliates", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer' }),
    __metadata("design:type", Number)
], Operator.prototype, "currentAffiliates", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Operator.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Operator.prototype, "tecnicalNumber", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Operator.prototype, "legalNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Operator.prototype, "observations", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Operator.prototype, "operatorCertification", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Operator.prototype, "validity", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Operator.prototype, "route", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Operator.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Operator.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => users_entity_1.User),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", users_entity_1.User)
], Operator.prototype, "operator", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => payorders_entity_1.Payorder, (payorder) => payorder.operator),
    __metadata("design:type", Array)
], Operator.prototype, "payorders", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.User, (user) => user.operatorsUpdate, { cascade: false }),
    __metadata("design:type", users_entity_1.User)
], Operator.prototype, "user", void 0);
exports.Operator = Operator = __decorate([
    (0, typeorm_1.Entity)()
], Operator);
//# sourceMappingURL=operators.entity.js.map