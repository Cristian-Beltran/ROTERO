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
exports.Owner = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const users_entity_1 = require("../users/users.entity");
const operators_entity_1 = require("../operators/operators.entity");
const vehicle_entity_1 = require("../vehicle/vehicle.entity");
let Owner = class Owner {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, firstName: { required: true, type: () => String }, lastName: { required: true, type: () => String }, ci: { required: true, type: () => String }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, operator: { required: true, type: () => require("../operators/operators.entity").Operator }, vehicles: { required: true, type: () => [require("../vehicle/vehicle.entity").Vehicle] }, user: { required: true, type: () => require("../users/users.entity").User } };
    }
};
exports.Owner = Owner;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Owner.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Owner.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Owner.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Owner.prototype, "ci", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Owner.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Owner.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => operators_entity_1.Operator, (operator) => operator.owners, {
        cascade: false,
    }),
    __metadata("design:type", operators_entity_1.Operator)
], Owner.prototype, "operator", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => vehicle_entity_1.Vehicle, (vehicle) => vehicle.owner, { cascade: false }),
    __metadata("design:type", Array)
], Owner.prototype, "vehicles", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.User, (user) => user.ownersUpdate, { cascade: false }),
    __metadata("design:type", users_entity_1.User)
], Owner.prototype, "user", void 0);
exports.Owner = Owner = __decorate([
    (0, typeorm_1.Entity)()
], Owner);
//# sourceMappingURL=owners.entity.js.map