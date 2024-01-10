"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeSantionsModule = void 0;
const common_1 = require("@nestjs/common");
const type_santions_service_1 = require("./type-santions.service");
const type_santions_controller_1 = require("./type-santions.controller");
const typeorm_1 = require("@nestjs/typeorm");
const type_santions_entity_1 = require("./type-santions.entity");
const users_module_1 = require("../users/users.module");
const type_payorders_module_1 = require("../type-payorders/type-payorders.module");
let TypeSantionsModule = class TypeSantionsModule {
};
exports.TypeSantionsModule = TypeSantionsModule;
exports.TypeSantionsModule = TypeSantionsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([type_santions_entity_1.TypeSantion]),
            users_module_1.UsersModule,
            type_payorders_module_1.TypePayordersModule,
        ],
        providers: [type_santions_service_1.TypeSantionsService],
        controllers: [type_santions_controller_1.TypeSantionsController],
        exports: [type_santions_service_1.TypeSantionsService],
    })
], TypeSantionsModule);
//# sourceMappingURL=type-santions.module.js.map