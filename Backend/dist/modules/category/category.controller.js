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
exports.CategoryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const category_service_1 = require("./category.service");
const user_dto_1 = require("../user/user.dto");
const category_dto_1 = require("./category.dto");
const roles_guard_1 = require("../../utils/guard/roles.guard");
let CategoryController = class CategoryController {
    categoryService;
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    async create(data) {
        return this.categoryService.create(data);
    }
    async list() {
        return this.categoryService.list();
    }
    async findById(id) {
        return this.categoryService.findById(id);
    }
    async update(id, data) {
        return this.categoryService.update(id, data);
    }
    async delete(id) {
        return this.categoryService.delete(id);
    }
};
exports.CategoryController = CategoryController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_guard_1.Roles)('admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Criar nova categoria' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: category_dto_1.CategoryResponseDTO }),
    (0, swagger_1.ApiResponse)({ description: 'Estrutura dos erros de requisição', type: user_dto_1.HttpErrorResponseDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_dto_1.CreateCategoryRequestDTO]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar categorias' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [category_dto_1.CategoryResponseDTO] }),
    (0, swagger_1.ApiResponse)({ description: 'Estrutura dos erros de requisição', type: user_dto_1.HttpErrorResponseDTO }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar categoria por ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: category_dto_1.CategoryResponseDTO }),
    (0, swagger_1.ApiResponse)({ description: 'Estrutura dos erros de requisição', type: user_dto_1.HttpErrorResponseDTO }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "findById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_guard_1.Roles)('admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar uma categoria' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: category_dto_1.CategoryResponseDTO }),
    (0, swagger_1.ApiResponse)({ description: 'Estrutura dos erros de requisição', type: user_dto_1.HttpErrorResponseDTO }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, category_dto_1.UpdateCategoryRequestDTO]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_guard_1.Roles)('admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Remover uma categoria' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Categoria removida com sucesso' }),
    (0, swagger_1.ApiResponse)({ description: 'Estrutura dos erros de requisição', type: user_dto_1.HttpErrorResponseDTO }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "delete", null);
exports.CategoryController = CategoryController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('Categories'),
    (0, common_1.Controller)('categories'),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], CategoryController);
//# sourceMappingURL=category.controller.js.map