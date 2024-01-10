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
exports.User = exports.PermissionLevel = void 0;
const openapi = require("@nestjs/swagger");
const class_vehicle_entity_1 = require("../class-vehicle/class-vehicle.entity");
const drivers_entity_1 = require("../drivers/drivers.entity");
const operators_entity_1 = require("../operators/operators.entity");
const owners_entity_1 = require("../owners/owners.entity");
const payorders_entity_1 = require("../payorders/payorders.entity");
const roles_entity_1 = require("../roles/roles.entity");
const rossetes_entity_1 = require("../rossetes/rossetes.entity");
const routes_entity_1 = require("../routes/routes.entity");
const santions_entity_1 = require("../santions/santions.entity");
const type_payorders_entity_1 = require("../type-payorders/type-payorders.entity");
const type_santions_entity_1 = require("../type-santions/type-santions.entity");
const vehicle_entity_1 = require("../vehicle/vehicle.entity");
const typeorm_1 = require("typeorm");
var PermissionLevel;
(function (PermissionLevel) {
    PermissionLevel["SUPERADMINISTRADOR"] = "SUPERADMINISTRADOR";
    PermissionLevel["ADMINISTRADOR"] = "ADMINISTRADOR";
    PermissionLevel["TECNICO"] = "TECNICO";
    PermissionLevel["OPERADOR"] = "OPERADOR";
    PermissionLevel["CONSULTOR"] = "CONSULTOR";
})(PermissionLevel || (exports.PermissionLevel = PermissionLevel = {}));
let User = class User {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, firstName: { required: true, type: () => String }, lastName: { required: true, type: () => String }, birthday: { required: true, type: () => Date }, ci: { required: true, type: () => String }, email: { required: true, type: () => String }, password: { required: true, type: () => String }, permissionLevel: { required: true, enum: require("./users.entity").PermissionLevel }, isActive: { required: true, type: () => Boolean }, cellphone: { required: true, type: () => String }, lastLogin: { required: true, type: () => Date }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, role: { required: true, type: () => require("../roles/roles.entity").Role }, rolesUpdate: { required: true, type: () => [require("../roles/roles.entity").Role] }, operatorsUpdate: { required: true, type: () => [require("../operators/operators.entity").Operator] }, payordersUpdate: { required: true, type: () => [require("../payorders/payorders.entity").Payorder] }, santionsUpdate: { required: true, type: () => [require("../santions/santions.entity").Santion] }, ownersUpdate: { required: true, type: () => [require("../owners/owners.entity").Owner] }, driversUpdate: { required: true, type: () => [require("../drivers/drivers.entity").Driver] }, vehiclesUpdate: { required: true, type: () => [require("../vehicle/vehicle.entity").Vehicle] }, routesUpdate: { required: true, type: () => [require("../routes/routes.entity").Route] }, rossetesUpdate: { required: true, type: () => [require("../rossetes/rossetes.entity").Rossete] }, typePayordersUpdate: { required: true, type: () => [require("../type-payorders/type-payorders.entity").TypePayorder] }, typeSantionsUpdate: { required: true, type: () => [require("../type-santions/type-santions.entity").TypeSantion] }, classVehicleUpdate: { required: true, type: () => [require("../class-vehicle/class-vehicle.entity").ClassVehicle] } };
    }
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], User.prototype, "birthday", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "ci", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "permissionLevel", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "cellphone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "lastLogin", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => roles_entity_1.Role, (role) => role.users),
    __metadata("design:type", roles_entity_1.Role)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => roles_entity_1.Role, (role) => role.user),
    __metadata("design:type", Array)
], User.prototype, "rolesUpdate", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => operators_entity_1.Operator, (operator) => operator.user),
    __metadata("design:type", Array)
], User.prototype, "operatorsUpdate", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => payorders_entity_1.Payorder, (payorder) => payorder.user),
    __metadata("design:type", Array)
], User.prototype, "payordersUpdate", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => santions_entity_1.Santion, (santion) => santion.user),
    __metadata("design:type", Array)
], User.prototype, "santionsUpdate", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => owners_entity_1.Owner, (owner) => owner.user),
    __metadata("design:type", Array)
], User.prototype, "ownersUpdate", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => drivers_entity_1.Driver, (driver) => driver.user),
    __metadata("design:type", Array)
], User.prototype, "driversUpdate", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => vehicle_entity_1.Vehicle, (vehicle) => vehicle.user),
    __metadata("design:type", Array)
], User.prototype, "vehiclesUpdate", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => routes_entity_1.Route, (route) => route.user),
    __metadata("design:type", Array)
], User.prototype, "routesUpdate", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => rossetes_entity_1.Rossete, (rossete) => rossete.user),
    __metadata("design:type", Array)
], User.prototype, "rossetesUpdate", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => type_payorders_entity_1.TypePayorder, (typePayorder) => typePayorder.user),
    __metadata("design:type", Array)
], User.prototype, "typePayordersUpdate", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => type_santions_entity_1.TypeSantion, (typeSantion) => typeSantion.user),
    __metadata("design:type", Array)
], User.prototype, "typeSantionsUpdate", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => class_vehicle_entity_1.ClassVehicle, (classVehicle) => classVehicle.user),
    __metadata("design:type", Array)
], User.prototype, "classVehicleUpdate", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)()
], User);
//# sourceMappingURL=users.entity.js.map