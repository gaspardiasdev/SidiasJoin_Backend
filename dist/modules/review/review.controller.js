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
exports.ReviewController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const review_service_1 = require("./review.service");
const review_dto_1 = require("./review.dto");
const user_dto_1 = require("../user/user.dto");
const roles_guard_1 = require("../../utils/guard/roles.guard");
let ReviewController = class ReviewController {
    reviewService;
    constructor(reviewService) {
        this.reviewService = reviewService;
    }
    create(dto) {
        return this.reviewService.create(dto);
    }
    listByProvider(providerId) {
        return this.reviewService.listByProvider(providerId);
    }
    listByClient(clientId) {
        return this.reviewService.listByClient(clientId);
    }
    findUnique(providerId, clientId) {
        return this.reviewService.findUnique(providerId, clientId);
    }
    update(providerId, clientId, dto) {
        return this.reviewService.update(providerId, clientId, dto);
    }
    delete(providerId, clientId) {
        return this.reviewService.delete(providerId, clientId);
    }
};
exports.ReviewController = ReviewController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_guard_1.Roles)('cliente'),
    (0, swagger_1.ApiOperation)({ summary: 'Criar uma avaliação' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Avaliação criada com sucesso.' }),
    (0, swagger_1.ApiResponse)({ description: 'Estrutura dos erros de requisição', type: user_dto_1.HttpErrorResponseDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [review_dto_1.CreateReviewDto]),
    __metadata("design:returntype", void 0)
], ReviewController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('provider/:providerId'),
    (0, swagger_1.ApiOperation)({ summary: 'Listar avaliações de um prestador' }),
    (0, swagger_1.ApiParam)({ name: 'providerId', example: 1 }),
    (0, swagger_1.ApiResponse)({ description: 'Estrutura dos erros de requisição', type: user_dto_1.HttpErrorResponseDTO }),
    __param(0, (0, common_1.Param)('providerId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ReviewController.prototype, "listByProvider", null);
__decorate([
    (0, common_1.Get)('client/:clientId'),
    (0, swagger_1.ApiOperation)({ summary: 'Listar avaliações feitas por um cliente' }),
    (0, swagger_1.ApiParam)({ name: 'clientId', example: 2 }),
    (0, swagger_1.ApiResponse)({ description: 'Estrutura dos erros de requisição', type: user_dto_1.HttpErrorResponseDTO }),
    __param(0, (0, common_1.Param)('clientId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ReviewController.prototype, "listByClient", null);
__decorate([
    (0, common_1.Get)(':providerId/:clientId'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar avaliação única por prestador e cliente' }),
    (0, swagger_1.ApiParam)({ name: 'providerId', example: 1 }),
    (0, swagger_1.ApiParam)({ name: 'clientId', example: 2 }),
    (0, swagger_1.ApiResponse)({ description: 'Estrutura dos erros de requisição', type: user_dto_1.HttpErrorResponseDTO }),
    __param(0, (0, common_1.Param)('providerId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('clientId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], ReviewController.prototype, "findUnique", null);
__decorate([
    (0, common_1.Patch)(':providerId/:clientId'),
    (0, roles_guard_1.Roles)('cliente'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar uma avaliação' }),
    (0, swagger_1.ApiParam)({ name: 'providerId', example: 1 }),
    (0, swagger_1.ApiParam)({ name: 'clientId', example: 2 }),
    (0, swagger_1.ApiResponse)({ description: 'Estrutura dos erros de requisição', type: user_dto_1.HttpErrorResponseDTO }),
    __param(0, (0, common_1.Param)('providerId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('clientId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, review_dto_1.UpdateReviewDto]),
    __metadata("design:returntype", void 0)
], ReviewController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':providerId/:clientId'),
    (0, roles_guard_1.Roles)('cliente'),
    (0, swagger_1.ApiOperation)({ summary: 'Remover uma avaliação' }),
    (0, swagger_1.ApiParam)({ name: 'providerId', example: 1 }),
    (0, swagger_1.ApiParam)({ name: 'clientId', example: 2 }),
    (0, swagger_1.ApiResponse)({ description: 'Estrutura dos erros de requisição', type: user_dto_1.HttpErrorResponseDTO }),
    __param(0, (0, common_1.Param)('providerId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('clientId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], ReviewController.prototype, "delete", null);
exports.ReviewController = ReviewController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('Reviews'),
    (0, common_1.Controller)('reviews'),
    __metadata("design:paramtypes", [review_service_1.ReviewService])
], ReviewController);
//# sourceMappingURL=review.controller.js.map