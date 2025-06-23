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
exports.LikeController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const like_service_1 = require("./like.service");
const user_dto_1 = require("../user/user.dto");
const like_dto_1 = require("./like.dto");
const roles_guard_1 = require("../../utils/guard/roles.guard");
let LikeController = class LikeController {
    likeService;
    constructor(likeService) {
        this.likeService = likeService;
    }
    toggle(dto) {
        return this.likeService.toggle(dto);
    }
    listClientsWhoLiked(providerId) {
        return this.likeService.listClientsWhoLiked(providerId);
    }
    listProvidersLikedByClient(clientId) {
        return this.likeService.listProvidersLikedByClient(clientId);
    }
};
exports.LikeController = LikeController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_guard_1.Roles)('cliente'),
    (0, swagger_1.ApiOperation)({ summary: 'Curtir ou remover curtida de um prestador' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Like criado ou removido com sucesso.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erro de validação.' }),
    (0, swagger_1.ApiResponse)({ description: 'Estrutura dos erros de requisição', type: user_dto_1.HttpErrorResponseDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [like_dto_1.CreateLikeDto]),
    __metadata("design:returntype", void 0)
], LikeController.prototype, "toggle", null);
__decorate([
    (0, common_1.Get)('provider/:providerId'),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todos os clientes que deram like em um prestador' }),
    (0, swagger_1.ApiParam)({ name: 'providerId', example: 1 }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de clientes retornada com sucesso.' }),
    (0, swagger_1.ApiResponse)({ description: 'Estrutura dos erros de requisição', type: user_dto_1.HttpErrorResponseDTO }),
    __param(0, (0, common_1.Param)('providerId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LikeController.prototype, "listClientsWhoLiked", null);
__decorate([
    (0, common_1.Get)('client/:clientId'),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todos os prestadores que receberam like de um cliente' }),
    (0, swagger_1.ApiParam)({ name: 'clientId', example: 2 }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de prestadores retornada com sucesso.' }),
    (0, swagger_1.ApiResponse)({ description: 'Estrutura dos erros de requisição', type: user_dto_1.HttpErrorResponseDTO }),
    __param(0, (0, common_1.Param)('clientId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LikeController.prototype, "listProvidersLikedByClient", null);
exports.LikeController = LikeController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('Likes'),
    (0, common_1.Controller)('likes'),
    __metadata("design:paramtypes", [like_service_1.LikeService])
], LikeController);
//# sourceMappingURL=like.controller.js.map