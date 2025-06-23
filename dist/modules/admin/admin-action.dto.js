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
exports.CreateAdminActionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateAdminActionDto {
    adminId;
    providerId;
    action;
    note;
}
exports.CreateAdminActionDto = CreateAdminActionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'ID do administrador que realizou a ação' }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateAdminActionDto.prototype, "adminId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5, description: 'ID do prestador afetado pela ação' }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateAdminActionDto.prototype, "providerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'suspensão', description: 'Tipo de ação realizada' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAdminActionDto.prototype, "action", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Conta suspensa por violação dos termos de uso', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAdminActionDto.prototype, "note", void 0);
//# sourceMappingURL=admin-action.dto.js.map