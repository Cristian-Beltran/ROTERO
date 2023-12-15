"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayordersModule = void 0;
const common_1 = require("@nestjs/common");
const payorders_service_1 = require("./payorders.service");
const payorders_controller_1 = require("./payorders.controller");
const users_module_1 = require("../users/users.module");
const typeorm_1 = require("@nestjs/typeorm");
const payorders_entity_1 = require("./payorders.entity");
let PayordersModule = class PayordersModule {
};
exports.PayordersModule = PayordersModule;
exports.PayordersModule = PayordersModule = __decorate([
    (0, common_1.Module)({
        imports: [users_module_1.UsersModule, typeorm_1.TypeOrmModule.forFeature([payorders_entity_1.Payorder])],
        providers: [payorders_service_1.PayordersService],
        controllers: [payorders_controller_1.PayordersController],
    })
], PayordersModule);
//# sourceMappingURL=payorders.module.js.map