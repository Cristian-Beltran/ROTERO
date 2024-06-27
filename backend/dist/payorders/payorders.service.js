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
const detail_payorder_entity_1 = require("./detail_payorder.entity");
const service_service_1 = require("../service/service.service");
let PayordersService = class PayordersService {
    constructor(payorderRepository, detailPayorderRepository, userService, operatorService, serviceService) {
        this.payorderRepository = payorderRepository;
        this.detailPayorderRepository = detailPayorderRepository;
        this.userService = userService;
        this.operatorService = operatorService;
        this.serviceService = serviceService;
    }
    async getPayorders(initDate, endDate) {
        const init = new Date(initDate);
        const end = new Date(endDate);
        end.setUTCHours(23, 59, 59);
        const payorders = await this.payorderRepository.find({
            where: {
                createdAt: (0, typeorm_1.Between)(init, end),
            },
            relations: [
                'user',
                'operator',
                'detailPayorders',
                'detailPayorders.service',
            ],
            select: {
                user: {
                    id: true,
                    firstName: true,
                    lastName: true,
                },
            },
        });
        payorders.forEach((payorder) => {
            payorder.total = payorder.detailPayorders.reduce((total, detailPayorder) => {
                const subtotal = detailPayorder.count * detailPayorder.service.amount;
                return total + subtotal;
            }, 0);
        });
        return payorders;
    }
    async getPayorder(id) {
        const payorder = await this.payorderRepository.findOne({
            relations: ['operator'],
            where: { id },
        });
        const detailPayorders = await this.detailPayorderRepository.find({
            relations: ['service', 'payorder'],
            where: {
                payorder: { id },
            },
        });
        const detailPayordersMap = detailPayorders.map((detailPayorder) => {
            return {
                serviceId: detailPayorder.service.id,
                name: detailPayorder.service.name,
                amount: detailPayorder.service.amount,
                count: detailPayorder.count,
                total: detailPayorder.count * detailPayorder.service.amount,
            };
        });
        const amount = detailPayordersMap.reduce((acc, cur) => {
            return acc + cur.total;
        }, 0);
        const data = {
            ...payorder,
            detailPayorders: detailPayordersMap,
            amount,
        };
        return data;
    }
    async createPayorder(data, userId) {
        const user = await this.userService.getUserFilter({ id: userId });
        if (!user) {
            throw new common_2.HttpException('El usuario no existe', common_2.HttpStatus.NOT_FOUND);
        }
        const operator = await this.operatorService.getOperator(data.operatorId);
        const newPayorder = {
            reason: data.reason,
            operator,
            user,
            detail: data.detail,
            amountExtra: data.amountExtra,
            detailExtra: data.detailExtra,
        };
        const payorder = await this.payorderRepository.create(newPayorder);
        await this.payorderRepository.save(payorder);
        data.detailPayorders.map(async (detailPayorder) => {
            const service = await this.serviceService.getService(detailPayorder.serviceId);
            const newDetail = {
                service,
                payorder,
                count: detailPayorder.count,
            };
            const detail = this.detailPayorderRepository.create(newDetail);
            return this.detailPayorderRepository.save(detail);
        });
        return payorder;
    }
    async updatePayorder(id, data, userId) {
        const payorder = await this.payorderRepository.findOne({ where: { id } });
        if (!payorder) {
            throw new common_2.HttpException('La orden de pago no existe', common_2.HttpStatus.NOT_FOUND);
        }
        if (payorder.cancellation) {
            throw new common_2.HttpException('La orden de pago ya fue cancelada', common_2.HttpStatus.BAD_REQUEST);
        }
        const user = await this.userService.getUserFilter({ id: userId });
        const operator = await this.operatorService.getOperator(data.operatorId);
        const updatePayorder = {
            reason: data.reason,
            detail: data.detail,
            user,
            operator,
            amountExtra: data.amountExtra,
            detailExtra: data.detailExtra,
        };
        const detailPayorders = await this.detailPayorderRepository.find({
            where: { payorder: { id } },
        });
        await this.detailPayorderRepository.remove(detailPayorders);
        data.detailPayorders.map(async (detailPayorder) => {
            const service = await this.serviceService.getService(detailPayorder.serviceId);
            const newDetail = {
                service,
                payorder,
                count: detailPayorder.count,
            };
            const detail = this.detailPayorderRepository.create(newDetail);
            return this.detailPayorderRepository.save(detail);
        });
        return await this.payorderRepository.update(id, updatePayorder);
    }
    async deletePayorder(id) {
        try {
            const detailPayorders = await this.detailPayorderRepository.find({
                where: { payorder: { id } },
            });
            await this.detailPayorderRepository.remove(detailPayorders);
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
    __param(1, (0, typeorm_2.InjectRepository)(detail_payorder_entity_1.DetailPayorder)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        users_service_1.UsersService,
        operators_service_1.OperatorsService,
        service_service_1.ServiceService])
], PayordersService);
//# sourceMappingURL=payorders.service.js.map