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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const users_entity_1 = require("./users.entity");
const users_entity_2 = require("./users.entity");
const bcrypt = require("bcrypt");
const roles_entity_1 = require("../roles/roles.entity");
let UsersService = class UsersService {
    constructor(userRepository, roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }
    async getUserFilter(filter) {
        if (!filter.ci && !filter.birthday && !filter.email && !filter.id) {
            throw new common_1.HttpException('No se ha enviado ningun parametro', common_1.HttpStatus.NOT_FOUND);
        }
        const user = await this.userRepository.findOne({
            where: { isActive: true, ...filter },
            relations: ['role'],
        });
        return user;
    }
    async getUser(id) {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['role'],
        });
        return user;
    }
    async getUsers(permissionLevel) {
        if (permissionLevel === users_entity_2.PermissionLevel.ADMINISTRADOR) {
            const users = await this.userRepository.find({
                where: { permissionLevel: (0, typeorm_2.In)(['ADMINISTRADOR', 'SUPERADMINISTRADOR', 'TECNICO']) },
                relations: ['role'],
            });
            return users;
        }
        const users = await this.userRepository.find({
            where: { permissionLevel: permissionLevel },
            relations: ['role'],
        });
        return users;
    }
    async createUser(permissionLevel, data) {
        if (permissionLevel === users_entity_2.PermissionLevel.CONSULTOR) {
            const role = await this.roleRepository.findOne({
                where: { id: data.roleId },
            });
            data.role = role;
        }
        if (permissionLevel != users_entity_2.PermissionLevel.OPERADOR) {
            const passwordHash = await bcrypt.hash(data.ci, 10);
            data.password = passwordHash;
        }
        const user = await this.userRepository.findOne({
            where: { ci: data.ci },
        });
        if (user) {
            throw new common_1.HttpException('El ci ya esta ingresado', common_1.HttpStatus.NOT_FOUND);
        }
        permissionLevel = data.permissionLevel || permissionLevel;
        const newUser = this.userRepository.create({
            ...data,
            permissionLevel,
        });
        return await this.userRepository.save(newUser);
    }
    async updateUser(id, data) {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['role'],
        });
        if (!user) {
            throw new common_1.HttpException('El usuario no existe', common_1.HttpStatus.NOT_FOUND);
        }
        if (data.roleId && user.permissionLevel === users_entity_2.PermissionLevel.CONSULTOR) {
            const role = await this.roleRepository.findOne({
                where: { id: data.roleId },
            });
            data.role = role;
            delete data.roleId;
        }
        return await this.userRepository.update(id, data);
    }
    async deleteUser(id) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new common_1.HttpException('El usuario no existe', common_1.HttpStatus.NOT_FOUND);
        }
        return await this.userRepository.update(id, { isActive: false });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(roles_entity_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map