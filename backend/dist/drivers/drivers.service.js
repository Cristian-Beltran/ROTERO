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
exports.DriversService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const drivers_entity_1 = require("./drivers.entity");
const typeorm_2 = require("typeorm");
const users_service_1 = require("../users/users.service");
const operators_service_1 = require("../operators/operators.service");
let DriversService = class DriversService {
    constructor(driverRepository, userService, operatorService) {
        this.driverRepository = driverRepository;
        this.userService = userService;
        this.operatorService = operatorService;
    }
    async getDrivers(operatorId) {
        const drivers = await this.driverRepository.find({
            relations: ['user', 'operator'],
            select: {
                user: {
                    id: true,
                    firstName: true,
                    lastName: true,
                },
            },
            where: { operator: { id: operatorId } },
        });
        return drivers;
    }
    async getDriver(id) {
        const driver = await this.driverRepository.findOne({
            relations: ['operator'],
            where: { id },
        });
        return driver;
    }
    async createDriver(data, userId) {
        const user = await this.userService.getUserFilter({ id: userId });
        if (!user) {
            throw new common_1.HttpException('El usuario no existe', common_1.HttpStatus.NOT_FOUND);
        }
        const operator = await this.operatorService.getOperator(data.operatorId);
        const newDriver = {
            operator,
            user,
            firstName: data.firstName,
            lastName: data.lastName,
            ci: data.ci,
            cellphone: data.cellphone,
        };
        return await this.driverRepository.save(newDriver);
    }
    async updateDriver(id, data, userId) {
        const driver = await this.driverRepository.findOne({ where: { id } });
        if (!driver) {
            throw new common_1.HttpException('El conductor no existe', common_1.HttpStatus.NOT_FOUND);
        }
        const user = await this.userService.getUserFilter({ id: userId });
        if (!user) {
            throw new common_1.HttpException('El usuario no existe', common_1.HttpStatus.NOT_FOUND);
        }
        const operator = await this.operatorService.getOperator(data.operatorId);
        const newDriver = {
            operator,
            user,
            firstName: data.firstName,
            lastName: data.lastName,
            ci: data.ci,
            cellphone: data.cellphone,
        };
        await this.driverRepository.update(id, newDriver);
        return await this.driverRepository.findOne({ where: { id } });
    }
    async deleteDriver(id) {
        try {
            const driver = await this.driverRepository.findOne({ where: { id } });
            if (!driver) {
                throw new common_1.HttpException('El conductor no existe', common_1.HttpStatus.NOT_FOUND);
            }
            return await this.driverRepository.remove(driver);
        }
        catch (error) {
            return error;
        }
    }
};
exports.DriversService = DriversService;
exports.DriversService = DriversService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(drivers_entity_1.Driver)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService,
        operators_service_1.OperatorsService])
], DriversService);
//# sourceMappingURL=drivers.service.js.map