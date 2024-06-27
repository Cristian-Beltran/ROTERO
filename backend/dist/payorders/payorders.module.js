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
const operators_module_1 = require("../operators/operators.module");
const pdf_module_1 = require("../pdf/pdf.module");
const service_module_1 = require("../service/service.module");
const detail_payorder_entity_1 = require("./detail_payorder.entity");
let PayordersModule = class PayordersModule {
};
exports.PayordersModule = PayordersModule;
exports.PayordersModule = PayordersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            pdf_module_1.PdfModule,
            users_module_1.UsersModule,
            operators_module_1.OperatorsModule,
            service_module_1.ServiceModule,
            typeorm_1.TypeOrmModule.forFeature([payorders_entity_1.Payorder, detail_payorder_entity_1.DetailPayorder]),
        ],
        providers: [payorders_service_1.PayordersService],
        controllers: [payorders_controller_1.PayordersController],
        exports: [payorders_service_1.PayordersService],
    })
], PayordersModule);
//# sourceMappingURL=payorders.module.js.map