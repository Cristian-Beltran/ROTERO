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
exports.RoutesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const routes_entity_1 = require("./routes.entity");
const typeorm_2 = require("typeorm");
const users_service_1 = require("../users/users.service");
const operators_service_1 = require("../operators/operators.service");
let RoutesService = class RoutesService {
    constructor(routeRepository, userService, operatorService) {
        this.routeRepository = routeRepository;
        this.userService = userService;
        this.operatorService = operatorService;
    }
    async getRoutes() {
        const routes = await this.routeRepository.find({
            relations: ['user', 'operator'],
        });
        return routes;
    }
    async getRoute(id) {
        const route = await this.routeRepository.findOne({
            relations: ['operator'],
            where: { operator: { id } },
        });
        return route;
    }
    async createRoute(data, userId) {
        const user = await this.userService.getUser(userId);
        if (!user)
            throw new Error('Usuario no encontrado');
        const operator = await this.operatorService.getOperator(data.operatorId);
        if (!operator)
            throw new Error('Operador no encontrado');
        const newRoute = {
            user,
            operator,
            description: data.description,
            distance: data.distance,
            hourEntry: data.hourEntry,
            hourExit: data.hourExit,
            dayEntry: data.dayEntry,
            dayExit: data.dayExit,
            routeArray: JSON.stringify(data.routeArray),
        };
        return await this.routeRepository.save(newRoute);
    }
    async updateRoute(id, data, userId) {
        const route = await this.routeRepository.findOne({ where: { id } });
        if (!route)
            throw new Error('Ruta no encontrada');
        const user = await this.userService.getUser(userId);
        if (!user)
            throw new Error('Usuario no encontrado');
        const operator = await this.operatorService.getOperator(data.operatorId);
        if (!operator)
            throw new Error('Operador no encontrado');
        const newRoute = {
            user,
            operator,
            description: data.description,
            distance: data.distance,
            hourEntry: data.hourEntry,
            hourExit: data.hourExit,
            dayEntry: data.dayEntry,
            dayExit: data.dayExit,
            routeArray: JSON.stringify(data.routeArray),
        };
        await this.routeRepository.update(id, newRoute);
        return this.routeRepository.findOne({ where: { id } });
    }
    async deleteRoute(id) {
        try {
            const route = await this.routeRepository.findOne({ where: { id } });
            if (!route)
                throw new Error('Ruta no encontrada');
            return await this.routeRepository.delete(id);
        }
        catch (error) {
            return error;
        }
    }
    async uploadFiles(id, url) {
        const route = await this.getRoute(id);
        if (!route) {
            throw new common_1.HttpException('El operador no existe', common_1.HttpStatus.NOT_FOUND);
        }
        await this.routeRepository.update(id, {
            routeFile: url,
        });
        return true;
    }
};
exports.RoutesService = RoutesService;
exports.RoutesService = RoutesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(routes_entity_1.Route)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService,
        operators_service_1.OperatorsService])
], RoutesService);
//# sourceMappingURL=routes.service.js.map