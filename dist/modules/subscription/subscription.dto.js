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
exports.UpdateSubscriptionDto = exports.CreateSubscriptionDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateSubscriptionDto {
    providerId;
    paid;
    proofUrl;
    startsAt;
    expiresAt;
}
exports.CreateSubscriptionDto = CreateSubscriptionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'ID do prestador de serviço' }),
    (0, class_validator_1.IsInt)({ message: 'O ID do prestador deve ser um número inteiro.' }),
    __metadata("design:type", Number)
], CreateSubscriptionDto.prototype, "providerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Define se o pagamento foi feito' }),
    (0, class_validator_1.IsBoolean)({ message: 'O campo "paid" deve ser verdadeiro ou falso.' }),
    __metadata("design:type", Boolean)
], CreateSubscriptionDto.prototype, "paid", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'https://res.cloudinary.com/demo/image/upload/v1/comprovativo.png',
        description: 'URL do comprovativo de pagamento',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)({}, { message: 'A URL do comprovativo é inválida.' }),
    __metadata("design:type", String)
], CreateSubscriptionDto.prototype, "proofUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '2025-06-21T00:00:00.000Z',
        description: 'Data de início da assinatura',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({}, { message: 'A data de início deve estar no formato ISO.' }),
    __metadata("design:type", String)
], CreateSubscriptionDto.prototype, "startsAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '2025-12-21T00:00:00.000Z',
        description: 'Data de expiração da assinatura',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({}, { message: 'A data de expiração deve estar no formato ISO.' }),
    __metadata("design:type", String)
], CreateSubscriptionDto.prototype, "expiresAt", void 0);
class UpdateSubscriptionDto {
    paid;
    proofUrl;
    startsAt;
    expiresAt;
}
exports.UpdateSubscriptionDto = UpdateSubscriptionDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: true,
        description: 'Atualiza o status de pagamento',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)({ message: 'O campo "paid" deve ser verdadeiro ou falso.' }),
    __metadata("design:type", Boolean)
], UpdateSubscriptionDto.prototype, "paid", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'https://res.cloudinary.com/demo/image/upload/v1/comprovativo.png',
        description: 'URL atualizada do comprovativo de pagamento',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)({}, { message: 'A URL do comprovativo é inválida.' }),
    __metadata("design:type", String)
], UpdateSubscriptionDto.prototype, "proofUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '2025-06-21T00:00:00.000Z',
        description: 'Data de início da nova assinatura',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({}, { message: 'A data de início deve estar no formato ISO.' }),
    __metadata("design:type", String)
], UpdateSubscriptionDto.prototype, "startsAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '2025-12-21T00:00:00.000Z',
        description: 'Data de expiração da nova assinatura',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({}, { message: 'A data de expiração deve estar no formato ISO.' }),
    __metadata("design:type", String)
], UpdateSubscriptionDto.prototype, "expiresAt", void 0);
//# sourceMappingURL=subscription.dto.js.map