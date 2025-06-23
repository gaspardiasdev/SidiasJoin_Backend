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
exports.ServicesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../databases/connection/prisma.service");
let ServicesService = class ServicesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const category = await this.prisma.category.findUnique({ where: { id: data.categoryId } });
        if (!category) {
            throw new common_1.NotFoundException('Categoria não encontrada.');
        }
        const nameExists = await this.prisma.service.findUnique({
            where: { name: data.name },
        });
        if (nameExists) {
            throw new common_1.ConflictException('Já existe um serviço com este nome.');
        }
        return this.prisma.service.create({ data });
    }
    async list(categoryId, name) {
        return this.prisma.service.findMany({
            where: {
                categoryId: categoryId || undefined,
                name: name
                    ? {
                        contains: name,
                        mode: 'insensitive',
                    }
                    : undefined,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    async findById(id) {
        const service = await this.prisma.service.findUnique({ where: { id } });
        if (!service) {
            throw new common_1.NotFoundException('Serviço não encontrado.');
        }
        return service;
    }
    async update(id, data) {
        const existing = await this.prisma.service.findUnique({ where: { id } });
        if (!existing) {
            throw new common_1.NotFoundException('Serviço não encontrado.');
        }
        if (data.name && data.name !== existing.name) {
            const nameTaken = await this.prisma.service.findUnique({
                where: { name: data.name },
            });
            if (nameTaken) {
                throw new common_1.ConflictException('Já existe um serviço com este nome.');
            }
        }
        return this.prisma.service.update({
            where: { id },
            data,
        });
    }
    async delete(id) {
        const existing = await this.prisma.service.findUnique({ where: { id } });
        if (!existing) {
            throw new common_1.NotFoundException('Serviço não encontrado.');
        }
        await this.prisma.service.delete({ where: { id } });
        return { message: 'Serviço deletado com sucesso' };
    }
    async findProvidersByService(serviceId) {
        const providers = await this.prisma.user.findMany({
            where: {
                role: 'prestador',
                services: {
                    some: {
                        serviceId: serviceId,
                    },
                },
            },
        });
        return providers;
    }
};
exports.ServicesService = ServicesService;
exports.ServicesService = ServicesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ServicesService);
//# sourceMappingURL=services.service.js.map