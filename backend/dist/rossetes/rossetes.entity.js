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
exports.Rossete = exports.Status = void 0;
const openapi = require("@nestjs/swagger");
const users_entity_1 = require("../users/users.entity");
const typeorm_1 = require("typeorm");
const vehicle_entity_1 = require("../vehicle/vehicle.entity");
var Status;
(function (Status) {
    Status["BAJA"] = "BAJA";
    Status["DUPLICADO"] = "DUPLICADO";
    Status["REIMPRESO"] = "REIMPRESO";
    Status["REPOSICION"] = "REPOSICION";
    Status["VIGENTE"] = "VIGENTE";
})(Status || (exports.Status = Status = {}));
let Rossete = class Rossete {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, expiration: { required: true, type: () => String }, status: { required: true, enum: require("./rossetes.entity").Status }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, vehicle: { required: true, type: () => require("../vehicle/vehicle.entity").Vehicle }, user: { required: true, type: () => require("../users/users.entity").User } };
    }
};
exports.Rossete = Rossete;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Rossete.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Rossete.prototype, "expiration", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Rossete.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Rossete.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Rossete.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => vehicle_entity_1.Vehicle),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", vehicle_entity_1.Vehicle)
], Rossete.prototype, "vehicle", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.User, (user) => user.rossetesUpdate, { cascade: false }),
    __metadata("design:type", users_entity_1.User)
], Rossete.prototype, "user", void 0);
exports.Rossete = Rossete = __decorate([
    (0, typeorm_1.Entity)()
], Rossete);
//# sourceMappingURL=rossetes.entity.js.map