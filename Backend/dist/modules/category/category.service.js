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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../databases/connection/prisma.service");
let CategoryService = class CategoryService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const nameExists = await this.prisma.category.findUnique({
            where: { name: data.name },
        });
        if (nameExists) {
            throw new common_1.BadRequestException('Já existe uma categoria com esse nome.');
        }
        return this.prisma.category.create({ data });
    }
    async list() {
        return this.prisma.category.findMany();
    }
    async findById(id) {
        const category = await this.prisma.category.findUnique({ where: { id } });
        if (!category) {
            throw new common_1.NotFoundException('Categoria não encontrada.');
        }
        return category;
    }
    async update(id, data) {
        const category = await this.prisma.category.findUnique({ where: { id } });
        if (!category) {
            throw new common_1.NotFoundException('Categoria não encontrada.');
        }
        if (data.name && data.name !== category.name) {
            const nameExists = await this.prisma.category.findUnique({
                where: { name: data.name },
            });
            if (nameExists) {
                throw new common_1.BadRequestException('Já existe outra categoria com esse nome.');
            }
            return this.prisma.category.update({
                where: { id },
                data,
            });
        }
    }
    async delete(id) {
        const category = await this.prisma.category.findUnique({ where: { id } });
        if (!category) {
            throw new common_1.NotFoundException('Categoria não encontrada.');
        }
        await this.prisma.category.delete({ where: { id } });
        return { message: 'Categoria deletada com sucesso' };
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoryService);
//# sourceMappingURL=category.service.js.map