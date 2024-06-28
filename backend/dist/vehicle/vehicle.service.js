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
exports.VehicleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const vehicle_entity_1 = require("./vehicle.entity");
const typeorm_2 = require("typeorm");
const users_service_1 = require("../users/users.service");
const operators_service_1 = require("../operators/operators.service");
const owners_service_1 = require("../owners/owners.service");
let VehicleService = class VehicleService {
    constructor(vechileRepository, userService, operatorService, ownerService) {
        this.vechileRepository = vechileRepository;
        this.userService = userService;
        this.operatorService = operatorService;
        this.ownerService = ownerService;
    }
    async getVehicleForClass() {
        return this.vechileRepository
            .createQueryBuilder('vehicle')
            .select('classVehicle as className, COUNT(vehicle.classVehicle) as count')
            .groupBy('classVehicle')
            .getRawMany();
    }
    async getVehicles(operatorId) {
        const vehicles = await this.vechileRepository.find({
            relations: ['operator', 'owner', 'user'],
            where: { operator: { id: operatorId } },
        });
        return vehicles;
    }
    async getVehicleByPlate(plate) {
        const vehicle = await this.vechileRepository.findOne({
            where: { plate },
            relations: ['operator'],
        });
        return vehicle;
    }
    async getVehicle(id) {
        const vehicle = await this.vechileRepository.findOne({
            relations: ['operator', 'owner'],
            where: { id },
        });
        return vehicle;
    }
    async createVehicle(data, userId) {
        const user = await this.userService.getUser(userId);
        if (!user)
            throw new Error('Usuario no encontrado');
        const operator = await this.operatorService.getOperator(data.operatorId);
        if (!operator)
            throw new Error('Operador no encontrado');
        const owner = await this.ownerService.getOwner(data.ownerId);
        if (!owner)
            throw new Error('Propietario no encontrado');
        const newVehicle = {
            operator,
            owner,
            user,
            classVehicle: data.classVehicle,
            typeService: data.typeService,
            modality: data.modality,
            maxLoad: data.maxLoad,
            maxPass: data.maxPass,
            typeVehicle: data.typeVehicle,
            model: data.model,
            brand: data.brand,
            motor: data.motor,
            chassis: data.chassis,
            soat: data.soat,
            inspection: data.inspection,
            plate: data.plate,
        };
        return await this.vechileRepository.save(newVehicle);
    }
    async updateVehicle(id, data, userId) {
        const vehicle = await this.vechileRepository.findOne({ where: { id } });
        if (!vehicle)
            throw new Error('Vehiculo no encontrado');
        const user = await this.userService.getUser(userId);
        if (!user)
            throw new Error('Usuario no encontrado');
        const operator = await this.operatorService.getOperator(data.operatorId);
        if (!operator)
            throw new Error('Operador no encontrado');
        const owner = await this.ownerService.getOwner(data.ownerId);
        if (!owner)
            throw new Error('Propietario no encontrado');
        const newVehicle = {
            operator,
            owner,
            user,
            classVehicle: data.classVehicle,
            typeService: data.typeService,
            modality: data.modality,
            maxLoad: data.maxLoad,
            maxPass: data.maxPass,
            typeVehicle: data.typeVehicle,
            model: data.model,
            brand: data.brand,
            motor: data.motor,
            chassis: data.chassis,
            soat: data.soat,
            inspection: data.inspection,
            plate: data.plate,
        };
        await this.vechileRepository.update(id, newVehicle);
        return await this.vechileRepository.findOne({ where: { id } });
    }
    async deleteVehicle(id) {
        try {
            const vehicle = await this.vechileRepository.findOne({ where: { id } });
            if (!vehicle)
                throw new Error('Vehiculo no encontrado');
            const vehicleDelete = await this.vechileRepository.remove(vehicle);
            return vehicleDelete;
        }
        catch (error) {
            return error;
        }
    }
    async getVehicleById(plate) {
        try {
            const vehicle = await this.vechileRepository.findOne({
                where: { plate },
                relations: ['owner'],
            });
            if (!vehicle)
                throw new Error('Vehiculo no encontrado');
            return vehicle;
        }
        catch (error) {
            return error;
        }
    }
};
exports.VehicleService = VehicleService;
exports.VehicleService = VehicleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vehicle_entity_1.Vehicle)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService,
        operators_service_1.OperatorsService,
        owners_service_1.OwnersService])
], VehicleService);
//# sourceMappingURL=vehicle.service.js.map