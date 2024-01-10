"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutesModule = void 0;
const common_1 = require("@nestjs/common");
const routes_service_1 = require("./routes.service");
const routes_controller_1 = require("./routes.controller");
const typeorm_1 = require("@nestjs/typeorm");
const routes_entity_1 = require("./routes.entity");
const users_module_1 = require("../users/users.module");
const vehicle_module_1 = require("../vehicle/vehicle.module");
const cloudinary_module_1 = require("../cloudinary/cloudinary.module");
let RoutesModule = class RoutesModule {
};
exports.RoutesModule = RoutesModule;
exports.RoutesModule = RoutesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([routes_entity_1.Route]),
            users_module_1.UsersModule,
            vehicle_module_1.VehicleModule,
            cloudinary_module_1.CloudinaryModule,
        ],
        providers: [routes_service_1.RoutesService],
        controllers: [routes_controller_1.RoutesController],
        exports: [routes_service_1.RoutesService],
    })
], RoutesModule);
//# sourceMappingURL=routes.module.js.map