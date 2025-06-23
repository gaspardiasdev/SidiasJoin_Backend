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
exports.ServiceResponseDTO = exports.UpdateServiceRequestDTO = exports.CreateServiceRequestDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateServiceRequestDTO {
    categoryId;
    name;
    description;
}
exports.CreateServiceRequestDTO = CreateServiceRequestDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsInt)({ message: 'O ID da categoria deve ser um número inteiro.' }),
    __metadata("design:type", Number)
], CreateServiceRequestDTO.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Corte de cabelo masculino' }),
    (0, class_validator_1.IsString)({ message: 'O nome deve ser uma string.' }),
    (0, class_validator_1.MinLength)(3, { message: 'O nome deve ter pelo menos 3 caracteres.' }),
    (0, class_validator_1.MaxLength)(50, { message: 'O nome pode ter no máximo 50 caracteres.' }),
    __metadata("design:type", String)
], CreateServiceRequestDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Corte com máquina e tesoura, finalização com navalha.' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'A descrição deve ser uma string.' }),
    __metadata("design:type", String)
], CreateServiceRequestDTO.prototype, "description", void 0);
class UpdateServiceRequestDTO {
    categoryId;
    name;
    description;
    active;
}
exports.UpdateServiceRequestDTO = UpdateServiceRequestDTO;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 2 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'O ID da categoria deve ser um número inteiro.' }),
    __metadata("design:type", Number)
], UpdateServiceRequestDTO.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Corte masculino com degradê' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'O nome deve ser uma string.' }),
    (0, class_validator_1.MinLength)(3, { message: 'O nome deve ter pelo menos 3 caracteres.' }),
    (0, class_validator_1.MaxLength)(50, { message: 'O nome pode ter no máximo 50 caracteres.' }),
    __metadata("design:type", String)
], UpdateServiceRequestDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Atualizado: Corte completo com degradê e finalização.' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'A descrição deve ser uma string.' }),
    __metadata("design:type", String)
], UpdateServiceRequestDTO.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)({ message: 'O campo active deve ser verdadeiro ou falso.' }),
    __metadata("design:type", Boolean)
], UpdateServiceRequestDTO.prototype, "active", void 0);
class ServiceResponseDTO {
    id;
    name;
    description;
    ;
    active;
    categoryId;
    createdAt;
}
exports.ServiceResponseDTO = ServiceResponseDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], ServiceResponseDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Corte de cabelo masculino' }),
    __metadata("design:type", String)
], ServiceResponseDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Corte com máquina e tesoura, finalização com navalha.' }),
    __metadata("design:type", Object)
], ServiceResponseDTO.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], ServiceResponseDTO.prototype, "active", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], ServiceResponseDTO.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-06-18T12:34:56.000Z' }),
    __metadata("design:type", Date)
], ServiceResponseDTO.prototype, "createdAt", void 0);
//# sourceMappingURL=services.dto.js.map