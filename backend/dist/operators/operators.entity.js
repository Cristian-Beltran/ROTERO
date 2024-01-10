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
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const users_entity_1 = require("../users/users.entity");
const payorders_entity_1 = require("../payorders/payorders.entity");
const santions_entity_1 = require("../santions/santions.entity");
const owners_entity_1 = require("../owners/owners.entity");
const drivers_entity_1 = require("../drivers/drivers.entity");
const vehicle_entity_1 = require("../vehicle/vehicle.entity");
var State;
(function (State) {
    State["AUTORIZADO"] = "AUTORIZADO";
    State["BAJA"] = "BAJA";
    State["PROCESO"] = "PROCESO";
})(State || (exports.State = State = {}));
let Operator = class Operator {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, businessName: { required: true, type: () => String }, legalRepresentative: { required: true, type: () => String }, owner: { required: true, type: () => String }, seprec: { required: true, type: () => String }, nit: { required: true, type: () => String }, administrativeResolution: { required: true, type: () => String }, dateRa: { required: true, type: () => Date }, state: { required: true, enum: require("./operators.entity").State }, entityMatris: { required: true, type: () => String }, color: { required: true, type: () => String }, tecnicalNumberUrl: { required: true, type: () => String }, legalNumberUrl: { required: true, type: () => String }, tecnicalNumber: { required: true, type: () => String }, legalNumber: { required: true, type: () => String }, observations: { required: true, type: () => String }, validity: { required: true, type: () => Date }, route: { required: true, type: () => String }, authorizationDate: { required: true, type: () => Date }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, operator: { required: true, type: () => require("../users/users.entity").User }, payorders: { required: true, type: () => [require("../payorders/payorders.entity").Payorder] }, santions: { required: true, type: () => [require("../payorders/payorders.entity").Payorder] }, owners: { required: true, type: () => [require("../owners/owners.entity").Owner] }, vehicles: { required: true, type: () => [require("../vehicle/vehicle.entity").Vehicle] }, drivers: { required: true, type: () => [require("../drivers/drivers.entity").Driver] }, user: { required: true, type: () => require("../users/users.entity").User } };
    }
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
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Operator.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Operator.prototype, "entityMatris", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Operator.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Operator.prototype, "tecnicalNumberUrl", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Operator.prototype, "legalNumberUrl", void 0);
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
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Operator.prototype, "validity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Operator.prototype, "route", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Operator.prototype, "authorizationDate", void 0);
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
    (0, typeorm_1.OneToMany)(() => santions_entity_1.Santion, (santion) => santion.operator),
    __metadata("design:type", Array)
], Operator.prototype, "santions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => owners_entity_1.Owner, (owner) => owner.operator),
    __metadata("design:type", Array)
], Operator.prototype, "owners", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => vehicle_entity_1.Vehicle, (vehicle) => vehicle.operator),
    __metadata("design:type", Array)
], Operator.prototype, "vehicles", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => drivers_entity_1.Driver, (driver) => driver.operator, { cascade: false }),
    __metadata("design:type", Array)
], Operator.prototype, "drivers", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.User, (user) => user.operatorsUpdate, { cascade: false }),
    __metadata("design:type", users_entity_1.User)
], Operator.prototype, "user", void 0);
exports.Operator = Operator = __decorate([
    (0, typeorm_1.Entity)()
], Operator);
//# sourceMappingURL=operators.entity.js.map