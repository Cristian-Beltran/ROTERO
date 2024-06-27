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
exports.ServiceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const service_entity_1 = require("./service.entity");
const typeorm_2 = require("typeorm");
const users_service_1 = require("../users/users.service");
let ServiceService = class ServiceService {
    constructor(serviceRepository, userService) {
        this.serviceRepository = serviceRepository;
        this.userService = userService;
    }
    async getServices(type) {
        const services = await this.serviceRepository.find({
            where: { type: type },
            relations: ['user'],
        });
        return services;
    }
    async getService(id) {
        const service = await this.serviceRepository.findOne({
            where: { id },
            relations: ['user'],
        });
        return service;
    }
    async createService(data, userId) {
        const user = await this.userService.getUserFilter({ id: userId });
        if (!user) {
            throw new common_1.HttpException('El usuario no existe', common_1.HttpStatus.NOT_FOUND);
        }
        const service = this.serviceRepository.create(data);
        service.user = user;
        await this.serviceRepository.save(service);
        return service;
    }
    async updateService(id, data, userId) {
        const service = await this.serviceRepository.findOne({ where: { id } });
        if (!service) {
            throw new common_1.HttpException('El servicio no existe', common_1.HttpStatus.NOT_FOUND);
        }
        service.name = data.name;
        service.detail = data.detail;
        service.amount = data.amount;
        service.type = data.type;
        const user = await this.userService.getUserFilter({ id: userId });
        if (!user) {
            throw new common_1.HttpException('El usuario no existe', common_1.HttpStatus.NOT_FOUND);
        }
        service.user = user;
        await this.serviceRepository.save(service);
        return service;
    }
    async deleteService(id) {
        const service = await this.serviceRepository.findOne({ where: { id } });
        if (!service) {
            throw new common_1.HttpException('El servicio no existe', common_1.HttpStatus.NOT_FOUND);
        }
        await this.serviceRepository.delete(service);
        return service;
    }
};
exports.ServiceService = ServiceService;
exports.ServiceService = ServiceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(service_entity_1.Service)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService])
], ServiceService);
//# sourceMappingURL=service.service.js.map