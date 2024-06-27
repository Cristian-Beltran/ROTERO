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
exports.Route = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const users_entity_1 = require("../users/users.entity");
const vehicle_entity_1 = require("../vehicle/vehicle.entity");
let Route = class Route {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, startText: { required: true, type: () => String }, endText: { required: true, type: () => String }, description: { required: true, type: () => String }, distance: { required: true, type: () => Number }, hourEntry: { required: true, type: () => String }, hourExit: { required: true, type: () => String }, dayEntry: { required: true, type: () => String }, dayExit: { required: true, type: () => String }, routeFile: { required: true, type: () => String }, routeArray: { required: true, type: () => String }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, vehicle: { required: true, type: () => require("../vehicle/vehicle.entity").Vehicle }, user: { required: true, type: () => require("../users/users.entity").User } };
    }
};
exports.Route = Route;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Route.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Route.prototype, "startText", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Route.prototype, "endText", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Route.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], Route.prototype, "distance", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Route.prototype, "hourEntry", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Route.prototype, "hourExit", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Route.prototype, "dayEntry", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Route.prototype, "dayExit", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], Route.prototype, "routeFile", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Route.prototype, "routeArray", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Route.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Route.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => vehicle_entity_1.Vehicle),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", vehicle_entity_1.Vehicle)
], Route.prototype, "vehicle", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.User, (user) => user.routesUpdate, { cascade: false }),
    __metadata("design:type", users_entity_1.User)
], Route.prototype, "user", void 0);
exports.Route = Route = __decorate([
    (0, typeorm_1.Entity)()
], Route);
//# sourceMappingURL=routes.entity.js.map