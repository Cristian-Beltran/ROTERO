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
const drivers_service_1 = require("../drivers/drivers.service");
const owners_service_1 = require("../owners/owners.service");
const class_vehicle_service_1 = require("../class-vehicle/class-vehicle.service");
const pdf_service_1 = require("../pdf/pdf.service");
let VehicleService = class VehicleService {
    constructor(vechileRepository, userService, operatorService, driverService, ownerService, classVehicleService, pdfService) {
        this.vechileRepository = vechileRepository;
        this.userService = userService;
        this.operatorService = operatorService;
        this.driverService = driverService;
        this.ownerService = ownerService;
        this.classVehicleService = classVehicleService;
        this.pdfService = pdfService;
    }
    async getVehicleForClass() {
        return this.vechileRepository
            .createQueryBuilder('vehicle')
            .innerJoinAndSelect('vehicle.classVehicle', 'classVehicle')
            .select('classVehicle.name as className, COUNT(vehicle.id) as count')
            .groupBy('classVehicle.name')
            .getRawMany();
    }
    async getVehicles(operatorId) {
        const vehicles = await this.vechileRepository.find({
            relations: ['operator', 'driver', 'owner', 'user', 'classVehicle'],
            where: { operator: { id: operatorId } },
        });
        return vehicles;
    }
    async getVehicleByPlate(plate) {
        const vehicle = await this.vechileRepository.findOne({
            where: { plate },
            relations: ['driver', 'classVehicle', 'operator'],
        });
        return vehicle;
    }
    async getVehicle(id) {
        const vehicle = await this.vechileRepository.findOne({
            relations: ['operator', 'driver', 'owner', 'classVehicle'],
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
        const driver = await this.driverService.getDriver(data.driverId);
        if (!driver)
            throw new Error('Conductor no encontrado');
        const owner = await this.ownerService.getOwner(data.ownerId);
        if (!owner)
            throw new Error('Propietario no encontrado');
        const classVehicle = await this.classVehicleService.getClassVehicle(data.classVehicleId);
        if (!classVehicle)
            throw new Error('Clase de vehiculo no encontrada');
        const newVehicle = {
            operator,
            driver,
            owner,
            user,
            classVehicle,
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
            sure: data.sure,
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
        const driver = await this.driverService.getDriver(data.driverId);
        if (!driver)
            throw new Error('Conductor no encontrado');
        const owner = await this.ownerService.getOwner(data.ownerId);
        if (!owner)
            throw new Error('Propietario no encontrado');
        const classVehicle = await this.classVehicleService.getClassVehicle(data.classVehicleId);
        if (!classVehicle)
            throw new Error('Clase de vehiculo no encontrada');
        const newVehicle = {
            operator,
            driver,
            owner,
            user,
            classVehicle,
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
            sure: data.sure,
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
            const driver = await this.driverService.getDriver(vehicle.driver.id);
            if (!driver)
                throw new Error('Conductor no encontrado');
            const vehicleDelete = await this.vechileRepository.remove(vehicle);
            await this.driverService.deleteDriver(driver.id);
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
                relations: ['driver', 'owner'],
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
        drivers_service_1.DriversService,
        owners_service_1.OwnersService,
        class_vehicle_service_1.ClassVehicleService,
        pdf_service_1.PdfService])
], VehicleService);
//# sourceMappingURL=vehicle.service.js.map