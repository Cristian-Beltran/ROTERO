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
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const roles_entity_1 = require("./roles.entity");
const users_service_1 = require("../users/users.service");
let RolesService = class RolesService {
    constructor(roleService, userService) {
        this.roleService = roleService;
        this.userService = userService;
    }
    async getRoles() {
        const roles = await this.roleService.find({
            relations: ['user'],
            select: {
                user: {
                    id: true,
                    firstName: true,
                    lastName: true,
                },
            },
            where: { isActive: true },
        });
        return roles;
    }
    async getRole(id) {
        const role = await this.roleService.findOne({
            where: { id },
        });
        return role;
    }
    async createRole(data, userId) {
        const role = await this.roleService.findOne({
            where: { name: data.name },
        });
        const user = await this.userService.getUserFilter({ id: userId });
        if (role) {
            throw new common_1.HttpException('El rol ya existe', common_1.HttpStatus.CONFLICT);
        }
        const newRole = {
            ...data,
            user,
            isActive: true,
        };
        return await this.roleService.save(newRole);
    }
    async updateRole(id, data, userId) {
        const role = await this.roleService.findOne({ where: { id } });
        if (!role) {
            throw new common_1.HttpException('El rol no existe', common_1.HttpStatus.NOT_FOUND);
        }
        const user = await this.userService.getUserFilter({ id: userId });
        const updateRole = {
            ...data,
            user,
        };
        return await this.roleService.update(id, updateRole);
    }
    async deleteRole(id) {
        const role = await this.roleService.findOne({ where: { id } });
        if (!role) {
            throw new common_1.HttpException('El rol no existe', common_1.HttpStatus.NOT_FOUND);
        }
        return await this.roleService.update(id, { isActive: false });
    }
};
exports.RolesService = RolesService;
exports.RolesService = RolesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(roles_entity_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService])
], RolesService);
//# sourceMappingURL=roles.service.js.map