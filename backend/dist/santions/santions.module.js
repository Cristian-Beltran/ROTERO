"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SantionsModule = void 0;
const common_1 = require("@nestjs/common");
const santions_service_1 = require("./santions.service");
const santions_controller_1 = require("./santions.controller");
const typeorm_1 = require("@nestjs/typeorm");
const santions_entity_1 = require("./santions.entity");
const users_module_1 = require("../users/users.module");
const operators_module_1 = require("../operators/operators.module");
const payorders_module_1 = require("../payorders/payorders.module");
const type_santions_module_1 = require("../type-santions/type-santions.module");
let SantionsModule = class SantionsModule {
};
exports.SantionsModule = SantionsModule;
exports.SantionsModule = SantionsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            operators_module_1.OperatorsModule,
            payorders_module_1.PayordersModule,
            type_santions_module_1.TypeSantionsModule,
            typeorm_1.TypeOrmModule.forFeature([santions_entity_1.Santion]),
        ],
        providers: [santions_service_1.SantionsService],
        controllers: [santions_controller_1.SantionsController],
        exports: [santions_service_1.SantionsService],
    })
], SantionsModule);
//# sourceMappingURL=santions.module.js.map