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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async login(data) {
        const user = await this.userService.getUserFilter({ email: data.email });
        if (!user) {
            throw new common_1.HttpException('Usuario no encontrado', common_1.HttpStatus.NOT_FOUND);
        }
        const isMatch = await bcrypt.compare(data.password, user.password);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('Contraseña incorrecta');
        }
        if (user.permissionLevel === 'OPERADOR') {
            throw new common_1.UnauthorizedException('No tiene permisos para acceder');
        }
        await this.userService.updateUser(user.id, { lastLogin: new Date() });
        return {
            accessToken: await this.generateToken(user.id, user.ci, user.permissionLevel),
            ...user,
        };
    }
    async verify(userId) {
        const user = this.userService.getUserFilter({
            id: userId,
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Usuario no encontrado');
        }
        return user;
    }
    async updatePassword(id, password, oldPassword) {
        const user = await this.userService.getUserFilter({ id });
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('Contraseña incorrecta');
        }
        const passwordHash = await bcrypt.hash(password, 10);
        return await this.userService.updateUser(id, { password: passwordHash });
    }
    async updateProfile(id, data) {
        const user = await this.userService.getUserFilter({ id });
        if (!user) {
            throw new common_1.HttpException('Usuario no encontrado', common_1.HttpStatus.NOT_FOUND);
        }
        return await this.userService.updateUser(id, data);
    }
    async generateToken(id, ci, permissionLevel) {
        const payload = {
            sub: id,
            ci,
            permissionLevel,
        };
        return await this.jwtService.signAsync(payload);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map