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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperatorsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const users_service_1 = require("../users/users.service");
const operators_entity_1 = require("./operators.entity");
const users_entity_1 = require("../users/users.entity");
let OperatorsService = class OperatorsService {
    constructor(operatorRepository, userService) {
        this.operatorRepository = operatorRepository;
        this.userService = userService;
    }
    async getOperators() {
        const operators = await this.operatorRepository.find({
            relations: ['user', 'operator'],
        });
        return operators;
    }
    async getOperator(id) {
        const operator = await this.operatorRepository.findOne({
            where: { id },
            relations: ['user', 'operator'],
        });
        return operator;
    }
    async createOperator(data, operator, userId, fields) {
        const user = await this.userService.getUserFilter({ id: userId });
        if (!user) {
            throw new common_1.HttpException('El usuario no existe', common_1.HttpStatus.NOT_FOUND);
        }
        const operatorUser = await this.userService.createUser(users_entity_1.PermissionLevel.OPERADOR, operator);
        const newOperator = {
            ...data,
            user,
            operator: operatorUser,
            ...fields,
        };
        return this.operatorRepository.save(newOperator);
    }
    async updateOperator(id, data, operatorUser, userId, fields) {
        const user = await this.userService.getUserFilter({ id: userId });
        if (!user) {
            throw new common_1.HttpException('El usuario no existe', common_1.HttpStatus.NOT_FOUND);
        }
        const operatorsUpdate = {
            ...data,
            ...fields,
        };
        await this.operatorRepository.update(id, operatorsUpdate);
        const operator = await this.operatorRepository.findOne({ where: { id } });
        const operatorUpdateUser = await this.userService.updateUser(operator.operator.id, operatorUser);
        return { operator, operatorUpdateUser };
    }
};
exports.OperatorsService = OperatorsService;
exports.OperatorsService = OperatorsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(operators_entity_1.Operator)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService])
], OperatorsService);
//# sourceMappingURL=operators.service.js.map