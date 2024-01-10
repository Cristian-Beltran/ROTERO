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
exports.OwnersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const owners_entity_1 = require("./owners.entity");
const typeorm_2 = require("typeorm");
const operators_service_1 = require("../operators/operators.service");
const users_service_1 = require("../users/users.service");
let OwnersService = class OwnersService {
    constructor(ownerRepository, operatorService, userService) {
        this.ownerRepository = ownerRepository;
        this.operatorService = operatorService;
        this.userService = userService;
    }
    async getOwners(operatorId) {
        const owners = await this.ownerRepository.find({
            relations: ['operator', 'user'],
            where: { operator: { id: operatorId } },
        });
        return owners;
    }
    async getOwner(id) {
        const owner = await this.ownerRepository.findOne({
            relations: ['operator'],
            where: { id },
        });
        return owner;
    }
    async createOwner(data, userId) {
        const user = await this.userService.getUserFilter({ id: userId });
        if (!user) {
            throw new common_1.HttpException('El usuario no existe', common_1.HttpStatus.NOT_FOUND);
        }
        const operator = await this.operatorService.getOperator(data.operatorId);
        const newOwner = {
            operator,
            user,
            firstName: data.firstName,
            lastName: data.lastName,
            ci: data.ci,
            cellphone: data.cellphone,
        };
        return await this.ownerRepository.save(newOwner);
    }
    async updateOwner(id, data, userId) {
        const owner = await this.ownerRepository.findOne({ where: { id } });
        if (!owner) {
            throw new common_1.HttpException('El propietario no existe', common_1.HttpStatus.NOT_FOUND);
        }
        const user = await this.userService.getUserFilter({ id: userId });
        if (!user) {
            throw new common_1.HttpException('El usuario no existe', common_1.HttpStatus.NOT_FOUND);
        }
        const operator = await this.operatorService.getOperator(data.operatorId);
        const newOwner = {
            operator,
            user,
            firstName: data.firstName,
            lastName: data.lastName,
            ci: data.ci,
            cellphone: data.cellphone,
        };
        return await this.ownerRepository.update(id, newOwner);
    }
    async deleteOwner(id) {
        try {
            const owner = await this.ownerRepository.findOne({ where: { id } });
            if (!owner) {
                throw new common_1.HttpException('El propietario no existe', common_1.HttpStatus.NOT_FOUND);
            }
            return await this.ownerRepository.delete(id);
        }
        catch (error) {
            return error;
        }
    }
};
exports.OwnersService = OwnersService;
exports.OwnersService = OwnersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(owners_entity_1.Owner)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        operators_service_1.OperatorsService,
        users_service_1.UsersService])
], OwnersService);
//# sourceMappingURL=owners.service.js.map