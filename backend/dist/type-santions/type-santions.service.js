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
exports.TypeSantionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_service_1 = require("../users/users.service");
const type_santions_entity_1 = require("./type-santions.entity");
const typeorm_2 = require("typeorm");
const type_payorders_service_1 = require("../type-payorders/type-payorders.service");
let TypeSantionsService = class TypeSantionsService {
    constructor(typeSantionRepository, userService, typePayorderService) {
        this.typeSantionRepository = typeSantionRepository;
        this.userService = userService;
        this.typePayorderService = typePayorderService;
    }
    async getTypeSantions() {
        const typeSantions = await this.typeSantionRepository.find({
            relations: ['user', 'typePayorder'],
        });
        return typeSantions;
    }
    async getTypeSantion(id) {
        const typeSantion = await this.typeSantionRepository.findOne({
            where: { id },
            relations: ['user', 'typePayorder'],
        });
        return typeSantion;
    }
    async createTypeSantion(data, userId) {
        const user = await this.userService.getUser(userId);
        if (!user)
            throw new common_1.HttpException('Usuario no encontrado', common_1.HttpStatus.NOT_FOUND);
        const typePayorder = await this.typePayorderService.createTypePayorder(userId, {
            name: data.name,
            detail: data.detail,
            amount: data.amount,
        });
        if (!typePayorder)
            throw new Error('No se pudo crear el tipo de pago');
        const typeSantionData = {
            severity: data.severity,
            user,
            typePayorder,
        };
        return await this.typeSantionRepository.save(typeSantionData);
    }
    async updateTypeSantion(id, data, userId) {
        const typeSantion = await this.typeSantionRepository.findOne({
            where: { id },
            relations: ['typePayorder']
        });
        if (!typeSantion)
            throw new Error('Sancion no encontrada');
        const user = await this.userService.getUser(userId);
        if (!user)
            throw new Error('Usuario no encontrado');
        const typePayoder = await this.typePayorderService.updateTypePayorder(typeSantion.typePayorder.id, {
            name: data.name,
            detail: data.detail,
            amount: data.amount,
        }, userId);
        if (!typePayoder)
            throw new Error('No se pudo actualizar el tipo de pago');
        const typeSantionData = {
            severity: data.severity,
            user,
        };
        await this.typeSantionRepository.update(id, typeSantionData);
        return await this.typeSantionRepository.findOne({ where: { id } });
    }
    async deleteTypeSantion(id) {
        try {
            const typeSantion = await this.getTypeSantion(id);
            if (!typeSantion)
                throw new Error('Sancion no encontrada');
            await this.typeSantionRepository.delete(id);
            await this.typePayorderService.deleteTypePayorder(typeSantion.typePayorder.id);
            return true;
        }
        catch (error) {
            throw new Error('No se pudo eliminar la sancion');
        }
    }
};
exports.TypeSantionsService = TypeSantionsService;
exports.TypeSantionsService = TypeSantionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(type_santions_entity_1.TypeSantion)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService,
        type_payorders_service_1.TypePayordersService])
], TypeSantionsService);
//# sourceMappingURL=type-santions.service.js.map