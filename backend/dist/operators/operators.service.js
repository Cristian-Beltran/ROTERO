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
const operators_entity_2 = require("./operators.entity");
let OperatorsService = class OperatorsService {
    constructor(operatorRepository, userService) {
        this.operatorRepository = operatorRepository;
        this.userService = userService;
    }
    async getTotalEmployeeOperators() {
        const result = await this.operatorRepository
            .createQueryBuilder('operator')
            .select('operator.businessName as businessName')
            .addSelect((subQuery) => {
            return subQuery
                .select('COUNT(driver.id) as driverCount')
                .from('driver', 'driver')
                .where('driver.operator.id = operator.id');
        }, 'driverCount')
            .addSelect((subQuery) => {
            return subQuery
                .select('COUNT(owner.id) as ownerCount')
                .from('owner', 'owner')
                .where('owner.operator.id = operator.id');
        }, 'ownerCount')
            .groupBy('operator.businessName')
            .getRawMany();
        return result;
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
    async createOperator(data, operator, userId) {
        const user = await this.userService.getUserFilter({ id: userId });
        if (!user) {
            throw new common_1.HttpException('El usuario no existe', common_1.HttpStatus.NOT_FOUND);
        }
        const operatorUser = await this.userService.createUser(users_entity_1.PermissionLevel.OPERADOR, operator);
        const newOperator = {
            ...data,
            user,
            operator: operatorUser,
            state: operators_entity_2.State.PROCESO,
        };
        return await this.operatorRepository.save(newOperator);
    }
    async updateOperator(id, data, operatorUser, userId) {
        const user = await this.userService.getUserFilter({ id: userId });
        if (!user) {
            throw new common_1.HttpException('El usuario no existe', common_1.HttpStatus.NOT_FOUND);
        }
        const operatorsUpdate = {
            ...data,
        };
        await this.operatorRepository.update(id, operatorsUpdate);
        const operator = await this.operatorRepository.findOne({
            where: { id },
            relations: ['operator'],
        });
        const operatorUpdateUser = await this.userService.updateUser(operator.operator.id, operatorUser);
        return { operator, operatorUpdateUser };
    }
    async uploadFiles(id, url, location) {
        const operator = await this.operatorRepository.findOne({ where: { id } });
        if (!operator) {
            throw new common_1.HttpException('El operador no existe', common_1.HttpStatus.NOT_FOUND);
        }
        const data = {
            [location]: url,
        };
        return await this.operatorRepository.update(id, data);
    }
    async deleteOperator(id) {
        const operator = await this.operatorRepository.findOne({ where: { id } });
        if (!operator) {
            throw new common_1.HttpException('El operador no existe', common_1.HttpStatus.NOT_FOUND);
        }
        await this.operatorRepository.update(id, {
            state: operators_entity_2.State.BAJA,
        });
        return true;
    }
    async authorizeOperator(id) {
        const operator = await this.operatorRepository.findOne({ where: { id } });
        if (!operator) {
            throw new common_1.HttpException('El operador no existe', common_1.HttpStatus.NOT_FOUND);
        }
        if (operator.state === 'AUTORIZADO') {
            throw new common_1.HttpException('El operador ya esta autorizado', common_1.HttpStatus.CONFLICT);
        }
        const date = new Date();
        await this.operatorRepository.update(id, {
            state: operators_entity_2.State.AUTORIZADO,
            authorizationDate: date,
        });
        return true;
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