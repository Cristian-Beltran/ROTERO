"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypePayordersModule = void 0;
const common_1 = require("@nestjs/common");
const type_payorders_service_1 = require("./type-payorders.service");
const type_payorders_controller_1 = require("./type-payorders.controller");
const typeorm_1 = require("@nestjs/typeorm");
const type_payorders_entity_1 = require("./type-payorders.entity");
const users_module_1 = require("../users/users.module");
let TypePayordersModule = class TypePayordersModule {
};
exports.TypePayordersModule = TypePayordersModule;
exports.TypePayordersModule = TypePayordersModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([type_payorders_entity_1.TypePayorder]), users_module_1.UsersModule],
        providers: [type_payorders_service_1.TypePayordersService],
        controllers: [type_payorders_controller_1.TypePayordersController],
        exports: [type_payorders_service_1.TypePayordersService],
    })
], TypePayordersModule);
//# sourceMappingURL=type-payorders.module.js.map