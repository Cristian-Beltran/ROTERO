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
exports.RossetesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const rossetes_entity_1 = require("./rossetes.entity");
const typeorm_2 = require("typeorm");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const auth_constans_1 = require("../auth/auth.constans");
const vehicle_service_1 = require("../vehicle/vehicle.service");
let RossetesService = class RossetesService {
    constructor(rosseteRepository, jwtService, userService, vehicleService) {
        this.rosseteRepository = rosseteRepository;
        this.jwtService = jwtService;
        this.userService = userService;
        this.vehicleService = vehicleService;
    }
    async readQrRossete(token, userId) {
        let id;
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: auth_constans_1.jwtConstants.secret,
            });
            id = payload.id;
        }
        catch {
            throw new common_1.UnauthorizedException('La roseta no es valida');
        }
        const user = await this.userService.getUserFilter({ id: userId });
        if (!user)
            throw new common_1.HttpException('Usuario no encontrado', common_1.HttpStatus.NOT_FOUND);
        if (user.permissionLevel === 'CONSULTOR') {
            const data = ['vehicle', 'vehicle.classVehicle'];
            if (user.role.pDriver)
                data.push('vehicle.driver');
            if (user.role.pOperator)
                data.push('vehicle.operator');
            if (user.role.pOwner)
                data.push('vehicle.owner');
            const rossete = await this.rosseteRepository.findOne({
                where: { id },
                relations: data
            });
            if (!rossete)
                throw new common_1.HttpException('No se encontro la roseta', common_1.HttpStatus.NOT_FOUND);
            if (rossete.status === 'BAJA')
                throw new common_1.HttpException('La roseta esta dada de baja', common_1.HttpStatus.CONFLICT);
            return rossete;
        }
        else {
            const rossete = await this.rosseteRepository.findOne({
                where: { id },
                relations: ['vehicle', 'vehicle.classVehicle', 'vehicle.driver', 'vehicle.owner', 'vehicle.operator']
            });
            if (!rossete)
                throw new common_1.HttpException('No se encontro la roseta', common_1.HttpStatus.NOT_FOUND);
            if (rossete.status === 'BAJA')
                throw new common_1.HttpException('La roseta esta dada de baja', common_1.HttpStatus.CONFLICT);
            return rossete;
        }
    }
    async getRossetes() {
        const rossetes = await this.rosseteRepository.find({
            relations: ['user', 'vehicle', 'vehicle.operator'],
        });
        return rossetes;
    }
    async getRossete(id) {
        const rossete = await this.rosseteRepository.findOne({
            relations: ['vehicle', 'vehicle.operator'],
            where: { id },
        });
        return rossete;
    }
    async createRossete(data, userId) {
        const user = await this.userService.getUserFilter({ id: userId });
        if (!user)
            throw new Error('Usuario no encontrado');
        const vehicle = await this.vehicleService.getVehicle(data.vehicleId);
        if (!vehicle)
            throw new Error('Ruta no encontrada');
        const newRossete = {
            user,
            vehicle,
            expiration: data.expiration,
            status: data.status,
        };
        return await this.rosseteRepository.save(newRossete);
    }
    async updateRossete(id, data, userId) {
        const rossete = await this.rosseteRepository.findOne({ where: { id } });
        if (!rossete)
            throw new Error('Rossete no encontrado');
        const user = await this.userService.getUserFilter({ id: userId });
        if (!user)
            throw new Error('Usuario no encontrado');
        const vehicle = await this.vehicleService.getVehicle(data.vehicleId);
        if (!vehicle)
            throw new Error('Ruta no encontrada');
        const newRossete = {
            user,
            vehicle,
            expiration: data.expiration,
            status: data.status,
        };
        await this.rosseteRepository.update(id, newRossete);
        return await this.rosseteRepository.findOne({ where: { id } });
    }
    async deleteRossete(id) {
        const rossete = await this.rosseteRepository.findOne({ where: { id } });
        if (!rossete)
            throw new Error('Rossete no encontrado');
        await this.rosseteRepository.delete(id);
        return true;
    }
    async downRossete(id) {
        const rossete = await this.rosseteRepository.findOne({ where: { id } });
        if (!rossete)
            throw new Error('Rossete no encontrado');
        await this.rosseteRepository.update(id, {
            status: rossetes_entity_1.Status.BAJA,
        });
        return await this.rosseteRepository.findOne({ where: { id } });
    }
};
exports.RossetesService = RossetesService;
exports.RossetesService = RossetesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(rossetes_entity_1.Rossete)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        users_service_1.UsersService,
        vehicle_service_1.VehicleService])
], RossetesService);
//# sourceMappingURL=rossetes.service.js.map