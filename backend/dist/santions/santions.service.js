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
exports.SantionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const santions_entity_1 = require("./santions.entity");
const typeorm_2 = require("typeorm");
const users_service_1 = require("../users/users.service");
const operators_service_1 = require("../operators/operators.service");
const payorders_service_1 = require("../payorders/payorders.service");
const type_santions_service_1 = require("../type-santions/type-santions.service");
let SantionsService = class SantionsService {
    constructor(santionRepository, userService, operatorService, payorderService, typeSantionService) {
        this.santionRepository = santionRepository;
        this.userService = userService;
        this.operatorService = operatorService;
        this.payorderService = payorderService;
        this.typeSantionService = typeSantionService;
    }
    async getSantions(initDate, endDate) {
        const init = new Date(initDate);
        const end = new Date(endDate);
        end.setUTCHours(23, 59, 59);
        const santions = await this.santionRepository.find({
            relations: [
                'user',
                'operator',
                'payorder',
                'typeSantion',
                'typeSantion.typePayorder',
            ],
            select: {
                user: {
                    id: true,
                    firstName: true,
                    lastName: true,
                },
            },
            where: {
                createdAt: (0, typeorm_2.Between)(init, end),
            },
        });
        return santions;
    }
    async getSantion(id) {
        const santion = await this.santionRepository.findOne({
            relations: [
                'operator',
                'payorder',
                'typeSantion',
                'typeSantion.typePayorder',
            ],
            where: { id },
        });
        return santion;
    }
    async createSantion(data, userId) {
        const user = await this.userService.getUser(userId);
        if (!user)
            throw new Error('Usuario no encontrado');
        const typeSantion = await this.typeSantionService.getTypeSantion(data.typeSantionId);
        if (!typeSantion)
            throw new Error('Tipo de sancion no encontrado');
        const operator = await this.operatorService.getOperator(data.operatorId);
        if (!operator)
            throw new Error('Operador no encontrado');
        const payorderData = {
            typePayorderId: typeSantion.typePayorder.id,
            operatorId: data.operatorId,
            detail: data.detail,
        };
        const payorder = await this.payorderService.createPayorder(payorderData, userId);
        return await this.santionRepository.save({
            user,
            operator,
            payorder,
            typeSantion: typeSantion,
            detail: data.detail,
        });
    }
    async updateSantion(id, data, userId) {
        const santion = await this.santionRepository.findOne({
            where: { id },
            relations: ['operator', 'payorder', 'typeSantion', 'typeSantion.typePayorder'],
        });
        if (santion.payorder.cancellation)
            throw new Error('La sancion ya fue cancelada');
        const user = await this.userService.getUser(userId);
        if (!user)
            throw new Error('Usuario no encontrado');
        const operator = await this.operatorService.getOperator(data.operatorId);
        if (!operator)
            throw new Error('Operador no encontrado');
        const typeSantion = await this.typeSantionService.getTypeSantion(data.typeSantionId);
        const payorderData = {
            operatorId: data.operatorId,
            typePayorderId: typeSantion.typePayorder.id,
            detail: data.detail,
        };
        await this.payorderService.updatePayorder(santion.payorder.id, payorderData, userId);
        await this.santionRepository.update(id, {
            user,
            operator,
            typeSantion: typeSantion,
            detail: data.detail,
        });
        return await this.santionRepository.findOne({ where: { id } });
    }
    async deleteSantion(id) {
        const santion = await this.santionRepository.findOne({
            where: { id },
            relations: ['payorder'],
        });
        if (!santion)
            throw new Error('Sancion no encontrada');
        if (santion.payorder.cancellation)
            throw new Error('La sancion ya fue cancelada');
        await this.santionRepository.delete(id);
        await this.payorderService.deletePayorder(santion.payorder.id);
        return true;
    }
};
exports.SantionsService = SantionsService;
exports.SantionsService = SantionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(santions_entity_1.Santion)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService,
        operators_service_1.OperatorsService,
        payorders_service_1.PayordersService,
        type_santions_service_1.TypeSantionsService])
], SantionsService);
//# sourceMappingURL=santions.service.js.map