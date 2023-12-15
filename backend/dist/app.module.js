"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_module_1 = require("./users/users.module");
const roles_module_1 = require("./roles/roles.module");
const operators_module_1 = require("./operators/operators.module");
const payorders_module_1 = require("./payorders/payorders.module");
const santions_module_1 = require("./santions/santions.module");
const owners_module_1 = require("./owners/owners.module");
const drivers_module_1 = require("./drivers/drivers.module");
const vehicles_module_1 = require("./vehicles/vehicles.module");
const routes_module_1 = require("./routes/routes.module");
const rossetes_module_1 = require("./rossetes/rossetes.module");
const auth_module_1 = require("./auth/auth.module");
const cloudinary_module_1 = require("./cloudinary/cloudinary.module");
const config_1 = require("@nestjs/config");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mariadb',
                username: 'root',
                password: 'holamundo',
                host: 'localhost',
                port: 3306,
                database: 'ROTERO',
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: true,
                timezone: '-4',
            }),
            users_module_1.UsersModule,
            roles_module_1.RolesModule,
            operators_module_1.OperatorsModule,
            payorders_module_1.PayordersModule,
            santions_module_1.SantionsModule,
            owners_module_1.OwnersModule,
            drivers_module_1.DriversModule,
            vehicles_module_1.VehiclesModule,
            routes_module_1.RoutesModule,
            rossetes_module_1.RossetesModule,
            auth_module_1.AuthModule,
            cloudinary_module_1.CloudinaryModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map