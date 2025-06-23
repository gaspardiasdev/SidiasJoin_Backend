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
exports.UpdateReviewDto = exports.CreateReviewDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateReviewDto {
    providerId;
    clientId;
    rating;
    comment;
}
exports.CreateReviewDto = CreateReviewDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 12,
        description: 'ID do prestador de serviço que recebeu a avaliação',
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateReviewDto.prototype, "providerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 5,
        description: 'ID do cliente que fez a avaliação',
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateReviewDto.prototype, "clientId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 4,
        description: 'Nota da avaliação (de 1 a 5)',
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(5),
    __metadata("design:type", Number)
], CreateReviewDto.prototype, "rating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Ótimo atendimento, muito profissional!',
        description: 'Comentário opcional do cliente',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateReviewDto.prototype, "comment", void 0);
class UpdateReviewDto {
    rating;
    comment;
}
exports.UpdateReviewDto = UpdateReviewDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 4, description: 'Nota da avaliação (1 a 5)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(5),
    __metadata("design:type", Number)
], UpdateReviewDto.prototype, "rating", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Serviço excelente!', description: 'Comentário da avaliação' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateReviewDto.prototype, "comment", void 0);
//# sourceMappingURL=review.dto.js.map