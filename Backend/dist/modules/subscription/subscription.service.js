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
exports.SubscriptionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../databases/connection/prisma.service");
let SubscriptionService = class SubscriptionService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const exists = await this.prisma.subscription.findUnique({ where: { providerId: data.providerId } });
        if (exists) {
            throw new common_1.NotFoundException('Prestador já possui Assinatura.');
        }
        return this.prisma.subscription.create({
            data,
        });
    }
    async findAll() {
        return this.prisma.subscription.findMany({
            include: {
                provider: true,
            },
        });
    }
    async findByProviderId(providerId) {
        const subscription = await this.prisma.subscription.findUnique({
            where: { providerId },
            include: { provider: true },
        });
        if (!subscription) {
            throw new common_1.NotFoundException('Assinatura não encontrada para este prestador.');
        }
        return subscription;
    }
    async update(providerId, data) {
        const exists = await this.prisma.subscription.findUnique({ where: { providerId } });
        if (!exists) {
            throw new common_1.NotFoundException('Assinatura não encontrada para este prestador.');
        }
        return this.prisma.subscription.update({
            where: { providerId },
            data,
        });
    }
    async delete(providerId) {
        const exists = await this.prisma.subscription.findUnique({ where: { providerId } });
        if (!exists) {
            throw new common_1.NotFoundException('Assinatura não encontrada para este prestador.');
        }
        await this.prisma.subscription.delete({
            where: { providerId },
        });
        return { message: 'Assinatura cancelada com sucesso' };
    }
};
exports.SubscriptionService = SubscriptionService;
exports.SubscriptionService = SubscriptionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SubscriptionService);
//# sourceMappingURL=subscription.service.js.map