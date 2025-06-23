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
exports.AdminActionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../databases/connection/prisma.service");
let AdminActionService = class AdminActionService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async logAction(params) {
        return this.prisma.adminAction.create({
            data: {
                adminId: params.adminId,
                providerId: params.providerId,
                action: params.action,
                note: params.note,
            },
        });
    }
    async listAllLogs() {
        return this.prisma.adminAction.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                admin: true,
                provider: true,
            },
        });
    }
    async listByAdmin(adminId) {
        return this.prisma.adminAction.findMany({
            where: { adminId },
            orderBy: { createdAt: 'desc' },
            include: {
                provider: true,
            },
        });
    }
    async listByProvider(providerId) {
        return this.prisma.adminAction.findMany({
            where: { providerId },
            orderBy: { createdAt: 'desc' },
            include: {
                admin: true,
            },
        });
    }
};
exports.AdminActionService = AdminActionService;
exports.AdminActionService = AdminActionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminActionService);
//# sourceMappingURL=admin-action.service.js.map