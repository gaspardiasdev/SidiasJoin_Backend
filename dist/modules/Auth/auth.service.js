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
const bcrypt_1 = require("bcrypt");
const user_service_1 = require("../user/user.service");
const client_1 = require("@prisma/client");
let AuthService = class AuthService {
    jwtService;
    userService;
    constructor(jwtService, userService) {
        this.jwtService = jwtService;
        this.userService = userService;
    }
    async login(data) {
        const user = await this.userService.findByEmail(data.email);
        if (!user || !(await (0, bcrypt_1.compare)(data.password, user.passwordHash))) {
            throw new common_1.UnauthorizedException('Credenciais inválidas');
        }
        if (user.status == client_1.Status.pendente) {
            throw new common_1.BadRequestException('Usuário está inativo');
        }
        if (user.status == client_1.Status.suspenso) {
            throw new common_1.BadRequestException('Usuário está suspenso');
        }
        await this.userService.update(user.id, {
            lastSeen: new Date(),
            isOnline: true,
        });
        const token = await this.jwtService.signAsync({
            sub: user.id,
            email: user.email,
            role: user.role,
        });
        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                status: user.status,
                verified: user.verified
            },
        };
    }
    async validate(payload) {
        const user = await this.userService.findById(payload.sub);
        if (!user) {
            throw new common_1.UnauthorizedException('Usuário não encontrado');
        }
        return {
            id: user.id,
            email: user.email,
            role: user.role,
        };
    }
    async logout(id) {
        await this.userService.update(id, {
            lastSeen: new Date(),
            isOnline: false,
        });
        return { message: 'Logout realizado com sucesso' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_service_1.UserService])
], AuthService);
//# sourceMappingURL=auth.service.js.map