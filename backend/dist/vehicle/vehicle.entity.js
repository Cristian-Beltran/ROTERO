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
exports.Vehicle = exports.Modality = exports.TypeService = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const users_entity_1 = require("../users/users.entity");
const operators_entity_1 = require("../operators/operators.entity");
const owners_entity_1 = require("../owners/owners.entity");
var TypeService;
(function (TypeService) {
    TypeService["INTERPROVINCIAL"] = "interprovincial";
    TypeService["INTERMUNICIPAL"] = "intermunicipal";
})(TypeService || (exports.TypeService = TypeService = {}));
var Modality;
(function (Modality) {
    Modality["PASAJERO"] = "pasajero";
    Modality["CARGA"] = "carga";
    Modality["PASAJERO_CARGA"] = "pasajero y carga";
})(Modality || (exports.Modality = Modality = {}));
let Vehicle = class Vehicle {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, typeService: { required: true, enum: require("./vehicle.entity").TypeService }, modality: { required: true, enum: require("./vehicle.entity").Modality }, maxLoad: { required: true, type: () => Number }, maxPass: { required: true, type: () => Number }, typeVehicle: { required: true, type: () => String }, model: { required: true, type: () => String }, brand: { required: true, type: () => String }, motor: { required: true, type: () => String }, chassis: { required: true, type: () => String }, soat: { required: true, type: () => Boolean }, inspection: { required: true, type: () => Boolean }, plate: { required: true, type: () => String }, classVehicle: { required: true, type: () => String }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, operator: { required: true, type: () => require("../operators/operators.entity").Operator }, owner: { required: true, type: () => require("../owners/owners.entity").Owner }, user: { required: true, type: () => require("../users/users.entity").User } };
    }
};
exports.Vehicle = Vehicle;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Vehicle.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Vehicle.prototype, "typeService", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Vehicle.prototype, "modality", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Vehicle.prototype, "maxLoad", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Vehicle.prototype, "maxPass", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Vehicle.prototype, "typeVehicle", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Vehicle.prototype, "model", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Vehicle.prototype, "brand", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Vehicle.prototype, "motor", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Vehicle.prototype, "chassis", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Vehicle.prototype, "soat", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Vehicle.prototype, "inspection", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Vehicle.prototype, "plate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Vehicle.prototype, "classVehicle", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Vehicle.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Vehicle.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => operators_entity_1.Operator, (operator) => operator.vehicles, {
        cascade: false,
    }),
    __metadata("design:type", operators_entity_1.Operator)
], Vehicle.prototype, "operator", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => owners_entity_1.Owner, (owner) => owner.vehicles, {
        cascade: false,
    }),
    __metadata("design:type", owners_entity_1.Owner)
], Vehicle.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.User, (user) => user.vehiclesUpdate, { cascade: false }),
    __metadata("design:type", users_entity_1.User)
], Vehicle.prototype, "user", void 0);
exports.Vehicle = Vehicle = __decorate([
    (0, typeorm_1.Entity)()
], Vehicle);
//# sourceMappingURL=vehicle.entity.js.map