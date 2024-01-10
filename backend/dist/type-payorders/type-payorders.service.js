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
exports.TypePayordersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const type_payorders_entity_1 = require("./type-payorders.entity");
const typeorm_2 = require("typeorm");
const users_service_1 = require("../users/users.service");
let TypePayordersService = class TypePayordersService {
    constructor(typePayorderRepository, userService) {
        this.typePayorderRepository = typePayorderRepository;
        this.userService = userService;
    }
    async getTypePayorders() {
        const typePayorders = await this.typePayorderRepository.find({
            relations: ['user']
        });
        return typePayorders;
    }
    async getTypePayorder(id) {
        const typePayorder = await this.typePayorderRepository.findOne({
            where: { id },
        });
        return typePayorder;
    }
    async createTypePayorder(userId, data) {
        const user = await this.userService.getUser(userId);
        if (!user)
            throw new common_1.HttpException('Usuario no encontrado', common_1.HttpStatus.NOT_FOUND);
        const typePayorderData = {
            ...data,
            user,
        };
        return await this.typePayorderRepository.save(typePayorderData);
    }
    async updateTypePayorder(id, data, userId) {
        const typePayorder = await this.typePayorderRepository.findOne({
            where: { id },
        });
        if (!typePayorder)
            throw new common_1.HttpException('Tipo de pago no encontrado', common_1.HttpStatus.NOT_FOUND);
        const user = await this.userService.getUser(userId);
        if (!user)
            throw new common_1.HttpException('Usuario no encontrado', common_1.HttpStatus.NOT_FOUND);
        const typePayorderData = {
            ...data,
            user,
        };
        await this.typePayorderRepository.update(id, typePayorderData);
        return await this.typePayorderRepository.findOne({ where: { id } });
    }
    async deleteTypePayorder(id) {
        try {
            await this.typePayorderRepository.delete(id);
            return true;
        }
        catch (error) {
            throw new common_1.HttpException('Error al eliminar el tipo de pago', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.TypePayordersService = TypePayordersService;
exports.TypePayordersService = TypePayordersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(type_payorders_entity_1.TypePayorder)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService])
], TypePayordersService);
//# sourceMappingURL=type-payorders.service.js.map