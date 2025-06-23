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
exports.CategoryResponseDTO = exports.UpdateCategoryRequestDTO = exports.CreateCategoryRequestDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateCategoryRequestDTO {
    name;
    description;
}
exports.CreateCategoryRequestDTO = CreateCategoryRequestDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Futebol' }),
    (0, class_validator_1.IsString)({ message: 'O nome deve ser uma string.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O nome é obrigatório.' }),
    __metadata("design:type", String)
], CreateCategoryRequestDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Categoria para eventos de futebol.' }),
    (0, class_validator_1.IsString)({ message: 'A descrição deve ser uma string.' }),
    __metadata("design:type", String)
], CreateCategoryRequestDTO.prototype, "description", void 0);
class UpdateCategoryRequestDTO {
    name;
    description;
}
exports.UpdateCategoryRequestDTO = UpdateCategoryRequestDTO;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Futsal' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'O nome deve ser uma string.' }),
    __metadata("design:type", String)
], UpdateCategoryRequestDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Categoria para jogos de futsal.' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'A descrição deve ser uma string.' }),
    __metadata("design:type", String)
], UpdateCategoryRequestDTO.prototype, "description", void 0);
class CategoryResponseDTO {
    id;
    name;
    description;
    createdAt;
}
exports.CategoryResponseDTO = CategoryResponseDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], CategoryResponseDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Futebol' }),
    __metadata("design:type", String)
], CategoryResponseDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Categoria para eventos de futebol.' }),
    __metadata("design:type", String)
], CategoryResponseDTO.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-06-18T15:45:00.000Z' }),
    __metadata("design:type", Date)
], CategoryResponseDTO.prototype, "createdAt", void 0);
//# sourceMappingURL=category.dto.js.map