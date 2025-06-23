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
exports.LoginResponseDTO = exports.LoginRequestDTO = exports.AuthUserDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const class_validator_1 = require("class-validator");
class AuthUserDTO {
    id;
    name;
    email;
    role;
    status;
    verified;
}
exports.AuthUserDTO = AuthUserDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], AuthUserDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'René Manuel' }),
    __metadata("design:type", String)
], AuthUserDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'rene@example.com' }),
    __metadata("design:type", String)
], AuthUserDTO.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.Role, example: client_1.Role.cliente }),
    __metadata("design:type", String)
], AuthUserDTO.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.Status, example: client_1.Status.ativo }),
    __metadata("design:type", String)
], AuthUserDTO.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], AuthUserDTO.prototype, "verified", void 0);
class LoginRequestDTO {
    email;
    password;
}
exports.LoginRequestDTO = LoginRequestDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'rene@example.com' }),
    (0, class_validator_1.IsEmail)({}, { message: 'O e-mail deve ser válido.' }),
    __metadata("design:type", String)
], LoginRequestDTO.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'securePass123' }),
    (0, class_validator_1.IsString)({ message: 'A senha deve ser uma string.' }),
    (0, class_validator_1.MinLength)(6, { message: 'A senha deve ter no mínimo 6 caracteres.' }),
    __metadata("design:type", String)
], LoginRequestDTO.prototype, "password", void 0);
class LoginResponseDTO {
    token;
    user;
}
exports.LoginResponseDTO = LoginResponseDTO;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        description: 'JWT de autenticação',
    }),
    __metadata("design:type", String)
], LoginResponseDTO.prototype, "token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => AuthUserDTO,
        description: 'Dados públicos do usuário autenticado',
    }),
    __metadata("design:type", AuthUserDTO)
], LoginResponseDTO.prototype, "user", void 0);
//# sourceMappingURL=auth.dto.js.map