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
exports.ServiceController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const user_dto_1 = require("../user/user.dto");
const services_dto_1 = require("./services.dto");
const services_service_1 = require("./services.service");
const roles_guard_1 = require("../../utils/guard/roles.guard");
let ServiceController = class ServiceController {
    serviceService;
    constructor(serviceService) {
        this.serviceService = serviceService;
    }
    create(data) {
        return this.serviceService.create(data);
    }
    list(categoryId, name) {
        return this.serviceService.list(categoryId, name);
    }
    findById(id) {
        return this.serviceService.findById(id);
    }
    update(id, data) {
        return this.serviceService.update(id, data);
    }
    delete(id) {
        return this.serviceService.delete(id);
    }
    async getProvidersByService(serviceId) {
        return this.serviceService.findProvidersByService(serviceId);
    }
};
exports.ServiceController = ServiceController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_guard_1.Roles)('admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Criar um serviço' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: services_dto_1.ServiceResponseDTO }),
    (0, swagger_1.ApiResponse)({ description: 'Estrutura dos erros de requisição', type: user_dto_1.HttpErrorResponseDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [services_dto_1.CreateServiceRequestDTO]),
    __metadata("design:returntype", void 0)
], ServiceController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar serviços (filtrar por categoria e nome)' }),
    (0, swagger_1.ApiQuery)({ name: 'categoryId', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'name', required: false, type: String }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [services_dto_1.ServiceResponseDTO] }),
    (0, swagger_1.ApiResponse)({ description: 'Estrutura dos erros de requisição', type: user_dto_1.HttpErrorResponseDTO }),
    __param(0, (0, common_1.Query)('categoryId')),
    __param(1, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], ServiceController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar serviço por ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: services_dto_1.ServiceResponseDTO }),
    (0, swagger_1.ApiResponse)({ description: 'Estrutura dos erros de requisição', type: user_dto_1.HttpErrorResponseDTO }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ServiceController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_guard_1.Roles)('admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar serviço' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: services_dto_1.ServiceResponseDTO }),
    (0, swagger_1.ApiResponse)({ description: 'Estrutura dos erros de requisição', type: user_dto_1.HttpErrorResponseDTO }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, services_dto_1.UpdateServiceRequestDTO]),
    __metadata("design:returntype", void 0)
], ServiceController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_guard_1.Roles)('admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Deletar serviço' }),
    (0, swagger_1.ApiResponse)({ status: 204 }),
    (0, swagger_1.ApiResponse)({ description: 'Estrutura dos erros de requisição', type: user_dto_1.HttpErrorResponseDTO }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ServiceController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)(':id/providers'),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todos os prestadores que oferecem um serviço específico' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, type: user_dto_1.ProviderWithServicesDTO, isArray: true }),
    (0, swagger_1.ApiResponse)({ description: 'Estrutura dos erros de requisição', type: user_dto_1.HttpErrorResponseDTO }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ServiceController.prototype, "getProvidersByService", null);
exports.ServiceController = ServiceController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('Services'),
    (0, common_1.Controller)('services'),
    __metadata("design:paramtypes", [services_service_1.ServicesService])
], ServiceController);
//# sourceMappingURL=services.controller.js.map