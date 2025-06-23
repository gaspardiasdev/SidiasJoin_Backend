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
exports.AdminActionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const admin_action_service_1 = require("./admin-action.service");
const user_dto_1 = require("../user/user.dto");
const roles_guard_1 = require("../../utils/guard/roles.guard");
let AdminActionController = class AdminActionController {
    adminActionService;
    constructor(adminActionService) {
        this.adminActionService = adminActionService;
    }
    listAll() {
        return this.adminActionService.listAllLogs();
    }
    listByAdmin(adminId) {
        return this.adminActionService.listByAdmin(adminId);
    }
    listByProvider(providerId) {
        return this.adminActionService.listByProvider(providerId);
    }
};
exports.AdminActionController = AdminActionController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todos os logs de ações administrativas' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista retornada com sucesso.' }),
    (0, swagger_1.ApiResponse)({ description: 'Estrutura dos erros de requisição', type: user_dto_1.HttpErrorResponseDTO }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminActionController.prototype, "listAll", null);
__decorate([
    (0, common_1.Get)('admin/:adminId'),
    (0, swagger_1.ApiOperation)({ summary: 'Listar ações feitas por um administrador' }),
    (0, swagger_1.ApiParam)({ name: 'adminId', example: 1 }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Ações do admin retornadas com sucesso.' }),
    (0, swagger_1.ApiResponse)({ description: 'Estrutura dos erros de requisição', type: user_dto_1.HttpErrorResponseDTO }),
    __param(0, (0, common_1.Param)('adminId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AdminActionController.prototype, "listByAdmin", null);
__decorate([
    (0, common_1.Get)('provider/:providerId'),
    (0, swagger_1.ApiOperation)({ summary: 'Listar ações administrativas sobre um prestador' }),
    (0, swagger_1.ApiParam)({ name: 'providerId', example: 10 }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Ações sobre o prestador retornadas com sucesso.' }),
    (0, swagger_1.ApiResponse)({ description: 'Estrutura dos erros de requisição', type: user_dto_1.HttpErrorResponseDTO }),
    __param(0, (0, common_1.Param)('providerId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AdminActionController.prototype, "listByProvider", null);
exports.AdminActionController = AdminActionController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_guard_1.Roles)('admin'),
    (0, swagger_1.ApiTags)('Admin Actions'),
    (0, common_1.Controller)('admin-actions'),
    __metadata("design:paramtypes", [admin_action_service_1.AdminActionService])
], AdminActionController);
//# sourceMappingURL=admin-action.controller.js.map