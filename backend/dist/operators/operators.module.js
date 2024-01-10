"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperatorsModule = void 0;
const common_1 = require("@nestjs/common");
const operators_service_1 = require("./operators.service");
const operators_controller_1 = require("./operators.controller");
const users_module_1 = require("../users/users.module");
const cloudinary_module_1 = require("../cloudinary/cloudinary.module");
const typeorm_1 = require("@nestjs/typeorm");
const operators_entity_1 = require("./operators.entity");
let OperatorsModule = class OperatorsModule {
};
exports.OperatorsModule = OperatorsModule;
exports.OperatorsModule = OperatorsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            cloudinary_module_1.CloudinaryModule,
            typeorm_1.TypeOrmModule.forFeature([operators_entity_1.Operator]),
        ],
        providers: [operators_service_1.OperatorsService],
        controllers: [operators_controller_1.OperatorsController],
        exports: [operators_service_1.OperatorsService],
    })
], OperatorsModule);
//# sourceMappingURL=operators.module.js.map