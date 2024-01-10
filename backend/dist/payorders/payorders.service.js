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
exports.PayordersService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const users_service_1 = require("../users/users.service");
const payorders_entity_1 = require("./payorders.entity");
const typeorm_2 = require("@nestjs/typeorm");
const operators_service_1 = require("../operators/operators.service");
const type_payorders_service_1 = require("../type-payorders/type-payorders.service");
let PayordersService = class PayordersService {
    constructor(payorderRepository, userService, operatorService, typePayoderService) {
        this.payorderRepository = payorderRepository;
        this.userService = userService;
        this.operatorService = operatorService;
        this.typePayoderService = typePayoderService;
    }
    async getPayorders(initDate, endDate) {
        const init = new Date(initDate);
        const end = new Date(endDate);
        end.setUTCHours(23, 59, 59);
        const payorders = await this.payorderRepository.find({
            where: {
                createdAt: (0, typeorm_1.Between)(init, end),
            },
            relations: ['user', 'operator', 'typePayorder'],
            select: {
                user: {
                    id: true,
                    firstName: true,
                    lastName: true,
                },
            },
        });
        return payorders;
    }
    async getPayorder(id) {
        const payorder = await this.payorderRepository.findOne({
            relations: ['operator', 'typePayorder'],
            where: { id },
        });
        return payorder;
    }
    async createPayorder(data, userId) {
        const user = await this.userService.getUserFilter({ id: userId });
        if (!user) {
            throw new common_2.HttpException('El usuario no existe', common_2.HttpStatus.NOT_FOUND);
        }
        const typePayorder = await this.typePayoderService.getTypePayorder(data.typePayorderId);
        if (!typePayorder) {
            throw new common_2.HttpException('El tipo de pago no existe', common_2.HttpStatus.NOT_FOUND);
        }
        const operator = await this.operatorService.getOperator(data.operatorId);
        const newPayorder = {
            operator,
            user,
            typePayorder,
            detail: data.detail,
        };
        return await this.payorderRepository.save(newPayorder);
    }
    async updatePayorder(id, data, userId) {
        const payorder = await this.payorderRepository.findOne({ where: { id } });
        if (!payorder) {
            throw new common_2.HttpException('La orden de pago no existe', common_2.HttpStatus.NOT_FOUND);
        }
        if (payorder.cancellation) {
            throw new common_2.HttpException('La orden de pago ya fue cancelada', common_2.HttpStatus.BAD_REQUEST);
        }
        const typePayorder = await this.typePayoderService.getTypePayorder(data.typePayorderId);
        if (!typePayorder) {
            throw new common_2.HttpException('El tipo de pago no existe', common_2.HttpStatus.NOT_FOUND);
        }
        const user = await this.userService.getUserFilter({ id: userId });
        const operator = await this.operatorService.getOperator(data.operatorId);
        const updatePayorder = {
            detail: data.detail,
            user,
            operator,
            typePayorder,
        };
        return await this.payorderRepository.update(id, updatePayorder);
    }
    async deletePayorder(id) {
        try {
            const payorder = await this.payorderRepository.findOne({ where: { id } });
            if (!payorder) {
                throw new common_2.HttpException('La orden de pago no existe', common_2.HttpStatus.NOT_FOUND);
            }
            if (payorder.cancellation) {
                throw new common_2.HttpException('La orden de pago ya fue cancelada', common_2.HttpStatus.BAD_REQUEST);
            }
            return await this.payorderRepository.delete(id);
        }
        catch (error) {
            return error;
        }
    }
    async cancelPayorder(id) {
        const payorder = await this.payorderRepository.findOne({ where: { id } });
        if (!payorder) {
            throw new common_2.HttpException('La orden de pago no existe', common_2.HttpStatus.NOT_FOUND);
        }
        if (payorder.cancellation) {
            throw new common_2.HttpException('La orden de pago ya fue cancelada', common_2.HttpStatus.BAD_REQUEST);
        }
        const date = new Date();
        return await this.payorderRepository.update(id, {
            cancellation: true,
            cancellationDate: date,
        });
    }
};
exports.PayordersService = PayordersService;
exports.PayordersService = PayordersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(payorders_entity_1.Payorder)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        users_service_1.UsersService,
        operators_service_1.OperatorsService,
        type_payorders_service_1.TypePayordersService])
], PayordersService);
//# sourceMappingURL=payorders.service.js.map