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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_dto_1 = require("./user.dto");
const swagger_1 = require("@nestjs/swagger");
const services_dto_1 = require("../services/services.dto");
const public_guard_1 = require("../../utils/guard/public.guard");
const roles_guard_1 = require("../../utils/guard/roles.guard");
const platform_express_1 = require("@nestjs/platform-express");
let UserController = class UserController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    async create(body) {
        return await this.userService.create(body);
    }
    async list() {
        return await this.userService.list();
    }
    async findById(id) {
        return await this.userService.findById(Number(id));
    }
    async update(id, body) {
        return await this.userService.update(Number(id), body);
    }
    async updatePhoto(id, file) {
        return this.userService.updatePhoto(id, file);
    }
    async delete(id) {
        return await this.userService.delete(Number(id));
    }
    async updateEmail(userId, dto) {
        return this.userService.updateEmail(userId, dto);
    }
    async updatePassword(userId, dto) {
        return this.userService.updatePassword(userId, dto);
    }
    async updateStatus(userId, data) {
        return this.userService.updateStatus(userId, data);
    }
    async updateVerificationStatus(id) {
        return this.userService.updateVerificationStatus(id);
    }
    async addProviderRole(id) {
        await this.userService.addProviderRole(id);
        return { message: 'Usuário agora é um prestador de serviço.' };
    }
    async removeProviderRole(id) {
        await this.userService.removeProviderRole(id);
        return { message: 'Usuário deixou de ser um prestador de serviço.' };
    }
    async addServices(userId, body) {
        await this.userService.addServicesToProvider(userId, body.serviceIds);
        return { message: 'Serviços adicionados com sucesso.' };
    }
    async removeServices(userId, body) {
        return this.userService.removeServicesFromProvider(userId, body.serviceIds);
    }
    async getProviderWithServices(id) {
        return this.userService.getServicesByProvider(id);
    }
    async setPrimaryFlag(providerId, serviceId) {
        return this.userService.setPrimaryFlag(providerId, serviceId);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)(),
    (0, public_guard_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Criar novo usuário' }),
    (0, swagger_1.ApiBody)({ type: user_dto_1.CreateUserRequestDTO }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Usuário criado com sucesso', type: user_dto_1.UserResponseDTO }),
    (0, swagger_1.ApiResponse)({ description: 'Estrutura dos erros de requisição', type: user_dto_1.HttpErrorResponseDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.CreateUserRequestDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_guard_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todos os usuários' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [user_dto_1.UserResponseDTO] }),
    (0, swagger_1.ApiResponse)({ description: 'Estrutura dos erros de requisição', type: user_dto_1.HttpErrorResponseDTO }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar usuário por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, type: user_dto_1.UserResponseDTO }),
    (0, swagger_1.ApiResponse)({ description: 'Estrutura dos erros de requisição', type: user_dto_1.HttpErrorResponseDTO }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar usuário por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number }),
    (0, swagger_1.ApiBody)({ type: user_dto_1.UpdateUserRequestDTO }),
    (0, swagger_1.ApiResponse)({ status: 200, type: user_dto_1.UserResponseDTO }),
    (0, swagger_1.ApiResponse)({ description: 'Estrutura dos erros de requisição', type: user_dto_1.HttpErrorResponseDTO }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UpdateUserRequestDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/photo'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar foto do usuário' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, example: 1 }),
    (0, swagger_1.ApiBody)({ type: user_dto_1.UploadPhotoDTO }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Foto de perfil atualizada com sucesso.' }),
    (0, swagger_1.ApiResponse)({ description: 'Estrutura dos erros de requisição', type: user_dto_1.HttpErrorResponseDTO }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updatePhoto", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_guard_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Deletar usuário por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Usuário deletado com sucesso' }),
    (0, swagger_1.ApiResponse)({ description: 'Estrutura dos erros de requisição', type: user_dto_1.HttpErrorResponseDTO }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
__decorate([
    (0, common_1.Patch)(':id/email'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar e-mail do usuário' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number }),
    (0, swagger_1.ApiBody)({ type: user_dto_1.UpdateEmailDTO }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'E-mail atualizado com sucesso' }),
    (0, swagger_1.ApiResponse)({ description: 'Estrutura dos erros de requisição', type: user_dto_1.HttpErrorResponseDTO }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_dto_1.UpdateEmailDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateEmail", null);
__decorate([
    (0, common_1.Patch)(':id/password'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar senha do usuário' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number }),
    (0, swagger_1.ApiBody)({ type: user_dto_1.UpdatePasswordDTO }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Senha atualizada com sucesso' }),
    (0, swagger_1.ApiResponse)({ description: 'Estrutura dos erros de requisição', type: user_dto_1.HttpErrorResponseDTO }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_dto_1.UpdatePasswordDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updatePassword", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, roles_guard_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar status do usuário' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number }),
    (0, swagger_1.ApiBody)({ type: user_dto_1.UpdateStatusDTO }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Status atualizado com sucesso' }),
    (0, swagger_1.ApiResponse)({ description: 'Estrutura dos erros de requisição', type: user_dto_1.HttpErrorResponseDTO }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_dto_1.UpdateStatusDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Patch)(':id/verification'),
    (0, roles_guard_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar status de verificação do usuário' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Status de verificação atualizado' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Usuário não encontrado' }),
    (0, swagger_1.ApiResponse)({ description: 'Estrutura dos erros de requisição', type: user_dto_1.HttpErrorResponseDTO }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateVerificationStatus", null);
__decorate([
    (0, common_1.Patch)(':id/provider-role'),
    (0, roles_guard_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Tornar usuário um prestador de serviços' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Usuário agora é um prestador' }),
    (0, swagger_1.ApiResponse)({ description: 'Estrutura dos erros de requisição', type: user_dto_1.HttpErrorResponseDTO }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addProviderRole", null);
__decorate([
    (0, common_1.Delete)(':id/provider-role'),
    (0, roles_guard_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Remover função de prestador de serviços do usuário' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Função de prestador removida' }),
    (0, swagger_1.ApiResponse)({ description: 'Estrutura dos erros de requisição', type: user_dto_1.HttpErrorResponseDTO }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "removeProviderRole", null);
__decorate([
    (0, common_1.Post)(':id/services'),
    (0, roles_guard_1.Roles)('prestador'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Adicionar serviços a um prestador de serviço' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Serviços adicionados com sucesso' }),
    (0, swagger_1.ApiResponse)({ description: 'Estrutura dos erros de requisição', type: user_dto_1.HttpErrorResponseDTO }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_dto_1.ServiceIdsDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addServices", null);
__decorate([
    (0, common_1.Delete)(':id/services'),
    (0, roles_guard_1.Roles)('prestador'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Remover serviços de um prestador de serviço' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Serviços removidos com sucesso' }),
    (0, swagger_1.ApiResponse)({ description: 'Estrutura dos erros de requisição', type: user_dto_1.HttpErrorResponseDTO }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_dto_1.ServiceIdsDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "removeServices", null);
__decorate([
    (0, common_1.Get)(':id/services'),
    (0, roles_guard_1.Roles)('prestador'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar serviços de um prestador de serviço' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [services_dto_1.ServiceResponseDTO] }),
    (0, swagger_1.ApiResponse)({ description: 'Estrutura dos erros de requisição', type: user_dto_1.HttpErrorResponseDTO }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getProviderWithServices", null);
__decorate([
    (0, common_1.Patch)(':providerId/services/:serviceId/primary'),
    (0, roles_guard_1.Roles)('prestador'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Alternar serviço principal do prestador' }),
    (0, swagger_1.ApiParam)({ name: 'providerId', type: Number }),
    (0, swagger_1.ApiParam)({ name: 'serviceId', type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Status de principal alterado com sucesso' }),
    (0, swagger_1.ApiResponse)({ description: 'Erro de validação ou não encontrado', type: user_dto_1.HttpErrorResponseDTO }),
    __param(0, (0, common_1.Param)('providerId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('serviceId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "setPrimaryFlag", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map