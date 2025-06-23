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
exports.HttpErrorResponseDTO = exports.ProviderWithServicesDTO = exports.ServiceIdsDTO = exports.UpdateStatusDTO = exports.UpdatePasswordDTO = exports.UpdateEmailDTO = exports.UserResponseDTO = exports.UploadPhotoDTO = exports.UpdateUserRequestDTO = exports.CreateUserRequestDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const class_validator_1 = require("class-validator");
const services_dto_1 = require("../services/services.dto");
class CreateUserRequestDTO {
    name;
    email;
    password;
    phone;
    location;
    imageUrl;
    role;
}
exports.CreateUserRequestDTO = CreateUserRequestDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'René Kemalandua' }),
    (0, class_validator_1.IsString)({ message: 'O nome deve ser uma string.' }),
    __metadata("design:type", String)
], CreateUserRequestDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'rene@example.com' }),
    (0, class_validator_1.IsEmail)({}, { message: 'O e-mail deve ser válido.' }),
    __metadata("design:type", String)
], CreateUserRequestDTO.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'securePass123' }),
    (0, class_validator_1.IsString)({ message: 'A senha deve ser uma string.' }),
    (0, class_validator_1.MinLength)(6, { message: 'A senha deve ter no mínimo 6 caracteres.' }),
    __metadata("design:type", String)
], CreateUserRequestDTO.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '923456789' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'O telefone deve ser uma string.' }),
    (0, class_validator_1.Matches)(/^(9[1-5]|9[7-9])\d{7}$/, {
        message: 'O telefone não é Válido.',
    }),
    __metadata("design:type", String)
], CreateUserRequestDTO.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Luanda, Angola' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'A localização deve ser uma string.' }),
    __metadata("design:type", String)
], CreateUserRequestDTO.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'https://res.cloudinary.com/demo/image/upload/v1/user.png',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)({}, { message: 'A URL da imagem deve ser válida.' }),
    __metadata("design:type", String)
], CreateUserRequestDTO.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: client_1.Role,
        default: client_1.Role.cliente,
        example: client_1.Role.cliente,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.Role, { message: 'O papel informado é inválido.' }),
    __metadata("design:type", String)
], CreateUserRequestDTO.prototype, "role", void 0);
class UpdateUserRequestDTO {
    name;
    phone;
    location;
    about;
    lat;
    lng;
    status;
    verified;
    isOnline;
    lastSeen;
}
exports.UpdateUserRequestDTO = UpdateUserRequestDTO;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'René Atualizado' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'O nome deve ser uma string.' }),
    __metadata("design:type", String)
], UpdateUserRequestDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '923456780' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'O telefone deve ser uma string.' }),
    (0, class_validator_1.Matches)(/^(9[1-5]|9[7-9])\d{7}$/, {
        message: 'O telefone não é Válido.',
    }),
    __metadata("design:type", String)
], UpdateUserRequestDTO.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Benguela, Angola' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'A localização deve ser uma string.' }),
    __metadata("design:type", String)
], UpdateUserRequestDTO.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Desenvolvedor fullstack apaixonado por IA.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'O campo "about" deve ser uma string.' }),
    __metadata("design:type", String)
], UpdateUserRequestDTO.prototype, "about", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: -8.838333 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: 'A latitude deve ser um número.' }),
    __metadata("design:type", Number)
], UpdateUserRequestDTO.prototype, "lat", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 13.234444 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: 'A longitude deve ser um número.' }),
    __metadata("design:type", Number)
], UpdateUserRequestDTO.prototype, "lng", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: client_1.Status, example: client_1.Status.ativo }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.Status, { message: 'O status informado é inválido.' }),
    __metadata("design:type", String)
], UpdateUserRequestDTO.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)({ message: 'O campo "verified" deve ser verdadeiro ou falso.' }),
    __metadata("design:type", Boolean)
], UpdateUserRequestDTO.prototype, "verified", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)({ message: 'O campo "isOnline" deve ser verdadeiro ou falso.' }),
    __metadata("design:type", Boolean)
], UpdateUserRequestDTO.prototype, "isOnline", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2025-06-18T12:34:56.000Z' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)({ message: 'A data de "lastSeen" deve ser uma data válida.' }),
    __metadata("design:type", Date)
], UpdateUserRequestDTO.prototype, "lastSeen", void 0);
class UploadPhotoDTO {
    file;
}
exports.UploadPhotoDTO = UploadPhotoDTO;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        format: 'binary',
        description: 'A nova foto do usuário',
        example: 'https://res.cloudinary.com/demo/image/upload/v1/new_photo.png',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'A imagem é obrigatória' }),
    __metadata("design:type", Object)
], UploadPhotoDTO.prototype, "file", void 0);
class UserResponseDTO {
    id;
    name;
    email;
    role;
    status;
    phone;
    location;
    imageUrl;
    about;
    lat;
    lng;
    verified;
    isOnline;
    lastSeen;
    createdAt;
    updatedAt;
}
exports.UserResponseDTO = UserResponseDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], UserResponseDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'René Manuel' }),
    __metadata("design:type", String)
], UserResponseDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'rene@example.com' }),
    __metadata("design:type", String)
], UserResponseDTO.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.Role, example: client_1.Role.cliente }),
    __metadata("design:type", String)
], UserResponseDTO.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.Status, example: client_1.Status.ativo }),
    __metadata("design:type", String)
], UserResponseDTO.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '+244923456789' }),
    __metadata("design:type", String)
], UserResponseDTO.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Luanda, Angola' }),
    __metadata("design:type", String)
], UserResponseDTO.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'https://res.cloudinary.com/demo/image/upload/v1/user.png',
    }),
    __metadata("design:type", String)
], UserResponseDTO.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Desenvolvedor fullstack apaixonado por IA.',
    }),
    __metadata("design:type", String)
], UserResponseDTO.prototype, "about", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: -8.838333 }),
    __metadata("design:type", Number)
], UserResponseDTO.prototype, "lat", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 13.234444 }),
    __metadata("design:type", Number)
], UserResponseDTO.prototype, "lng", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], UserResponseDTO.prototype, "verified", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], UserResponseDTO.prototype, "isOnline", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-06-18T12:34:56.000Z' }),
    __metadata("design:type", Date)
], UserResponseDTO.prototype, "lastSeen", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-06-18T12:34:56.000Z' }),
    __metadata("design:type", Date)
], UserResponseDTO.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-06-18T13:00:00.000Z' }),
    __metadata("design:type", Date)
], UserResponseDTO.prototype, "updatedAt", void 0);
class UpdateEmailDTO {
    email;
}
exports.UpdateEmailDTO = UpdateEmailDTO;
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'O e-mail deve ser válido.' }),
    (0, swagger_1.ApiProperty)({ example: 'novo@email.com' }),
    __metadata("design:type", String)
], UpdateEmailDTO.prototype, "email", void 0);
class UpdatePasswordDTO {
    currentPassword;
    newPassword;
}
exports.UpdatePasswordDTO = UpdatePasswordDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'senhaAtual123' }),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], UpdatePasswordDTO.prototype, "currentPassword", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'novaSenha456' }),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], UpdatePasswordDTO.prototype, "newPassword", void 0);
class UpdateStatusDTO {
    status;
}
exports.UpdateStatusDTO = UpdateStatusDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['pendente', 'ativo', 'suspenso'] }),
    (0, class_validator_1.IsIn)(['pendente', 'ativo', 'suspenso']),
    __metadata("design:type", String)
], UpdateStatusDTO.prototype, "status", void 0);
class ServiceIdsDTO {
    serviceIds;
}
exports.ServiceIdsDTO = ServiceIdsDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [Number], example: [1, 2, 3] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.IsInt)({ each: true }),
    __metadata("design:type", Array)
], ServiceIdsDTO.prototype, "serviceIds", void 0);
class ProviderWithServicesDTO {
    provider;
    services;
}
exports.ProviderWithServicesDTO = ProviderWithServicesDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => UserResponseDTO }),
    __metadata("design:type", UserResponseDTO)
], ProviderWithServicesDTO.prototype, "provider", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [services_dto_1.ServiceResponseDTO] }),
    __metadata("design:type", Array)
], ProviderWithServicesDTO.prototype, "services", void 0);
class HttpErrorResponseDTO {
    message;
    error;
    statusCode;
}
exports.HttpErrorResponseDTO = HttpErrorResponseDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'string || string[]' }),
    __metadata("design:type", String)
], HttpErrorResponseDTO.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'string' }),
    __metadata("design:type", String)
], HttpErrorResponseDTO.prototype, "error", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "number" }),
    __metadata("design:type", Number)
], HttpErrorResponseDTO.prototype, "statusCode", void 0);
//# sourceMappingURL=user.dto.js.map