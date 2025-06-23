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
exports.SubscriptionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const subscription_service_1 = require("./subscription.service");
const subscription_dto_1 = require("./subscription.dto");
const user_dto_1 = require("../user/user.dto");
const roles_guard_1 = require("../../utils/guard/roles.guard");
let SubscriptionController = class SubscriptionController {
    subscriptionService;
    constructor(subscriptionService) {
        this.subscriptionService = subscriptionService;
    }
    create(dto) {
        return this.subscriptionService.create(dto);
    }
    findAll() {
        return this.subscriptionService.findAll();
    }
    findByProviderId(providerId) {
        return this.subscriptionService.findByProviderId(providerId);
    }
    update(providerId, dto) {
        return this.subscriptionService.update(providerId, dto);
    }
    delete(providerId) {
        return this.subscriptionService.delete(providerId);
    }
};
exports.SubscriptionController = SubscriptionController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_guard_1.Roles)('prestador'),
    (0, swagger_1.ApiOperation)({ summary: 'Criar uma assinatura para um prestador' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Assinatura criada com sucesso.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Prestador já possui uma assinatura.' }),
    (0, swagger_1.ApiResponse)({ description: 'Estrutura dos erros de requisição', type: user_dto_1.HttpErrorResponseDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [subscription_dto_1.CreateSubscriptionDto]),
    __metadata("design:returntype", void 0)
], SubscriptionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_guard_1.Roles)('admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todas as assinaturas' }),
    (0, swagger_1.ApiResponse)({ description: 'Estrutura dos erros de requisição', type: user_dto_1.HttpErrorResponseDTO }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SubscriptionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':providerId'),
    (0, roles_guard_1.Roles)('prestador'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar assinatura de um prestador' }),
    (0, swagger_1.ApiParam)({ name: 'providerId', example: 1 }),
    (0, swagger_1.ApiResponse)({ description: 'Estrutura dos erros de requisição', type: user_dto_1.HttpErrorResponseDTO }),
    __param(0, (0, common_1.Param)('providerId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SubscriptionController.prototype, "findByProviderId", null);
__decorate([
    (0, common_1.Patch)(':providerId'),
    (0, roles_guard_1.Roles)('admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar assinatura de um prestador' }),
    (0, swagger_1.ApiParam)({ name: 'providerId', example: 1 }),
    (0, swagger_1.ApiResponse)({ description: 'Estrutura dos erros de requisição', type: user_dto_1.HttpErrorResponseDTO }),
    __param(0, (0, common_1.Param)('providerId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, subscription_dto_1.UpdateSubscriptionDto]),
    __metadata("design:returntype", void 0)
], SubscriptionController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':providerId'),
    (0, roles_guard_1.Roles)('admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Remover assinatura de um prestador' }),
    (0, swagger_1.ApiParam)({ name: 'providerId', example: 1 }),
    (0, swagger_1.ApiResponse)({ description: 'Estrutura dos erros de requisição', type: user_dto_1.HttpErrorResponseDTO }),
    __param(0, (0, common_1.Param)('providerId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SubscriptionController.prototype, "delete", null);
exports.SubscriptionController = SubscriptionController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('Subscriptions'),
    (0, common_1.Controller)('subscriptions'),
    __metadata("design:paramtypes", [subscription_service_1.SubscriptionService])
], SubscriptionController);
//# sourceMappingURL=subscription.controller.js.map