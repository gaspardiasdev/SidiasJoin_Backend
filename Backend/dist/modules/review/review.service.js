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
exports.ReviewService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../databases/connection/prisma.service");
let ReviewService = class ReviewService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        if (dto.providerId === dto.clientId) {
            throw new common_1.BadRequestException('Você não pode avaliar a si mesmo.');
        }
        const existingReview = await this.prisma.review.findUnique({
            where: {
                providerId_clientId: {
                    providerId: dto.providerId,
                    clientId: dto.clientId,
                },
            },
        });
        if (existingReview) {
            throw new common_1.BadRequestException('Você já avaliou esse prestador.');
        }
        return this.prisma.review.create({
            data: dto,
        });
    }
    async update(providerId, clientId, dto) {
        const review = await this.prisma.review.findUnique({
            where: {
                providerId_clientId: { providerId, clientId },
            },
        });
        if (!review) {
            throw new common_1.NotFoundException('Avaliação não encontrada.');
        }
        return this.prisma.review.update({
            where: {
                providerId_clientId: { providerId, clientId },
            },
            data: dto,
        });
    }
    async delete(providerId, clientId) {
        const review = await this.prisma.review.findUnique({
            where: {
                providerId_clientId: { providerId, clientId },
            },
        });
        if (!review) {
            throw new common_1.NotFoundException('Avaliação não encontrada.');
        }
        await this.prisma.review.delete({
            where: {
                providerId_clientId: { providerId, clientId },
            },
        });
        return { message: 'Avaliação deletada com sucesso' };
    }
    async listByProvider(providerId) {
        return this.prisma.review.findMany({
            where: { providerId },
            include: {
                client: { select: { id: true, name: true, imageUrl: true } },
            },
        });
    }
    async listByClient(clientId) {
        return this.prisma.review.findMany({
            where: { clientId },
            include: {
                provider: { select: { id: true, name: true, imageUrl: true } },
            },
        });
    }
    async findUnique(providerId, clientId) {
        return this.prisma.review.findUnique({
            where: {
                providerId_clientId: { providerId, clientId },
            },
        });
    }
};
exports.ReviewService = ReviewService;
exports.ReviewService = ReviewService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReviewService);
//# sourceMappingURL=review.service.js.map