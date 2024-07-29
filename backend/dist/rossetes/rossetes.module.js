"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RossetesModule = void 0;
const common_1 = require("@nestjs/common");
const rossetes_controller_1 = require("./rossetes.controller");
const rossetes_service_1 = require("./rossetes.service");
const typeorm_1 = require("@nestjs/typeorm");
const rossetes_entity_1 = require("./rossetes.entity");
const users_module_1 = require("../users/users.module");
const pdf_module_1 = require("../pdf/pdf.module");
const auth_constans_1 = require("../auth/auth.constans");
const jwt_1 = require("@nestjs/jwt");
const vehicle_module_1 = require("../vehicle/vehicle.module");
let RossetesModule = class RossetesModule {
};
exports.RossetesModule = RossetesModule;
exports.RossetesModule = RossetesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([rossetes_entity_1.Rossete]),
            users_module_1.UsersModule,
            vehicle_module_1.VehicleModule,
            pdf_module_1.PdfModule,
            jwt_1.JwtModule.register({
                global: true,
                secret: auth_constans_1.jwtConstants.secret,
                signOptions: { expiresIn: '1d' },
            }),
        ],
        controllers: [rossetes_controller_1.RossetesController],
        providers: [rossetes_service_1.RossetesService],
    })
], RossetesModule);
//# sourceMappingURL=rossetes.module.js.map