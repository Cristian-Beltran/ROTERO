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
exports.ClassVehicleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const class_vehicle_entity_1 = require("./class-vehicle.entity");
const typeorm_2 = require("typeorm");
const users_service_1 = require("../users/users.service");
let ClassVehicleService = class ClassVehicleService {
    constructor(classVehicleRepository, userService) {
        this.classVehicleRepository = classVehicleRepository;
        this.userService = userService;
    }
    async getClassVehicles() {
        return await this.classVehicleRepository.find({
            relations: ['user']
        });
    }
    async getClassVehicle(id) {
        return await this.classVehicleRepository.findOne({
            where: { id },
        });
    }
    async createClassVehicle(data, userId) {
        const user = await this.userService.getUserFilter({ id: userId });
        if (!user) {
            throw new common_1.HttpException('El usuario no existe', common_1.HttpStatus.NOT_FOUND);
        }
        const classVehicleData = {
            ...data,
            user,
        };
        return this.classVehicleRepository.save(classVehicleData);
    }
    async updateClassVehicle(id, data, userId) {
        const user = await this.userService.getUserFilter({ id: userId });
        if (!user) {
            throw new common_1.HttpException('El usuario no existe', common_1.HttpStatus.NOT_FOUND);
        }
        const classVehicle = await this.classVehicleRepository.findOne({
            where: { id },
        });
        if (!classVehicle) {
            throw new common_1.HttpException('La clase de vehiculo no existe', common_1.HttpStatus.NOT_FOUND);
        }
        const classVehicleData = {
            ...data,
            user,
        };
        await this.classVehicleRepository.update(id, classVehicleData);
        return await this.classVehicleRepository.findOne({
            where: { id },
        });
    }
    async deleteClassVehicle(id) {
        const classVehicle = await this.classVehicleRepository.findOne({
            where: { id },
        });
        if (!classVehicle) {
            throw new common_1.HttpException('La clase de vehiculo no existe', common_1.HttpStatus.NOT_FOUND);
        }
        return this.classVehicleRepository.delete(classVehicle);
    }
};
exports.ClassVehicleService = ClassVehicleService;
exports.ClassVehicleService = ClassVehicleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(class_vehicle_entity_1.ClassVehicle)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService])
], ClassVehicleService);
//# sourceMappingURL=class-vehicle.service.js.map