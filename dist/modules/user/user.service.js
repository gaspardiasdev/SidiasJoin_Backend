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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../databases/connection/prisma.service");
const bcrypt_1 = require("bcrypt");
const upload_service_1 = require("../../utils/upload/upload.service");
let UserService = class UserService {
    prisma;
    uploadService;
    constructor(prisma, uploadService) {
        this.prisma = prisma;
        this.uploadService = uploadService;
    }
    async create(data) {
        const userExists = await this.findByEmail(data.email);
        if (userExists)
            throw new common_1.ConflictException('Email já está em uso');
        const passwordHash = await (0, bcrypt_1.hash)(data.password, 10);
        const user = await this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                location: data.location,
                imageUrl: data.imageUrl,
                passwordHash,
                role: data.role,
            },
        });
        return this.removeSensitiveFields(user);
    }
    async list() {
        const users = await this.prisma.user.findMany();
        return users.map(this.removeSensitiveFields);
    }
    async findById(id) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user)
            throw new common_1.NotFoundException('Usuário não encontrado');
        return this.removeSensitiveFields(user);
    }
    async findByEmail(email) {
        return await this.prisma.user.findUnique({ where: { email } });
    }
    async update(id, data) {
        await this.ensureUserExists(id);
        const updated = await this.prisma.user.update({
            where: { id },
            data,
        });
        return this.removeSensitiveFields(updated);
    }
    async updatePhoto(id, file) {
        await this.ensureUserExists(id);
        const imageUrl = await this.uploadService.uploadImage(file);
        await this.prisma.user.update({
            where: { id },
            data: { imageUrl },
        });
        return { message: 'Foto de perfil atualizada com sucesso.' };
    }
    async delete(id) {
        await this.ensureUserExists(id);
        await this.prisma.user.delete({ where: { id } });
        return { message: 'Usuário deletado com sucesso' };
    }
    async updateEmail(userId, dto) {
        await this.ensureUserExists(userId);
        const existingUser = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (existingUser && existingUser.id !== userId) {
            throw new common_1.BadRequestException('Este e-mail já está em uso por outro usuário.');
        }
        await this.prisma.user.update({
            where: { id: userId },
            data: { email: dto.email },
        });
        return { message: 'E-mail atualizado com sucesso.' };
    }
    async updatePassword(userId, dto) {
        const user = await this.ensureUserExists(userId);
        const isSame = await (0, bcrypt_1.compare)(dto.currentPassword, user.passwordHash);
        if (!isSame) {
            throw new common_1.BadRequestException('Senha atual incorreta.');
        }
        const newHashed = await (0, bcrypt_1.hash)(dto.newPassword, 10);
        await this.prisma.user.update({
            where: { id: userId },
            data: { passwordHash: newHashed },
        });
        return { message: 'Senha atualizada com sucesso.' };
    }
    async updateStatus(userId, data) {
        await this.ensureUserExists(userId);
        await this.prisma.user.update({
            where: { id: userId },
            data: { status: data.status },
        });
        return { message: 'Status atualizada com sucesso.' };
    }
    async addProviderRole(userId) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new common_1.NotFoundException('Usuário não encontrado');
        if (user.role !== 'prestador') {
            await this.prisma.user.update({
                where: { id: userId },
                data: { role: 'prestador' },
            });
        }
    }
    async removeProviderRole(userId) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new common_1.NotFoundException('Usuário não encontrado');
        await this.prisma.providerService.deleteMany({ where: { providerId: userId } });
        await this.prisma.user.update({
            where: { id: userId },
            data: { role: 'cliente' },
        });
    }
    async addServicesToProvider(userId, serviceIds) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new common_1.NotFoundException('Usuário não encontrado');
        if (user.role !== 'prestador') {
            throw new common_1.BadRequestException('Usuário não é um prestador de serviço');
        }
        await this.ensureServicesExist(serviceIds);
        const data = serviceIds.map(serviceId => ({
            providerId: userId,
            serviceId,
        }));
        await this.prisma.providerService.createMany({
            data,
            skipDuplicates: true,
        });
    }
    async removeServicesFromProvider(userId, serviceIds) {
        await Promise.all(serviceIds.map((serviceId) => this.prisma.providerService.delete({
            where: {
                providerId_serviceId: {
                    providerId: userId,
                    serviceId,
                },
            },
        })));
        return { message: 'Serviços removidos com sucesso.' };
    }
    async getServicesByProvider(userId) {
        const provider = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!provider)
            throw new common_1.NotFoundException('Usuário não encontrado');
        if (provider.role !== 'prestador')
            throw new common_1.BadRequestException('Usuário não é um prestador');
        const providerServices = await this.prisma.providerService.findMany({
            where: { providerId: userId },
            select: {
                primaryFlag: true,
                service: true,
            },
        });
        return providerServices.map((ps) => ({
            ...ps.service,
            primaryFlag: ps.primaryFlag,
        }));
    }
    async setPrimaryFlag(providerId, serviceId) {
        await this.ensureUserExists(providerId);
        const current = await this.prisma.providerService.findUnique({
            where: {
                providerId_serviceId: { providerId, serviceId },
            },
        });
        if (!current)
            throw new common_1.NotFoundException('Serviço não encontrado para esse provedor.');
        if (current.primaryFlag) {
            await this.prisma.providerService.update({
                where: {
                    providerId_serviceId: { providerId, serviceId },
                },
                data: { primaryFlag: false },
            });
            return { message: 'Serviço deixou de ser o principal.' };
        }
        await this.prisma.providerService.updateMany({
            where: { providerId, primaryFlag: true },
            data: { primaryFlag: false },
        });
        await this.prisma.providerService.update({
            where: {
                providerId_serviceId: { providerId, serviceId },
            },
            data: { primaryFlag: true },
        });
        return { message: 'Serviço agora é o principal.' };
    }
    async updateVerificationStatus(id) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException('Usuário não encontrado');
        }
        const updatedUser = await this.prisma.user.update({
            where: { id },
            data: { verified: !user.verified },
        });
        return {
            message: `Status de verificação atualizado para: ${updatedUser.verified ? 'verificado' : 'não verificado'}.`,
        };
    }
    async ensureUserExists(id) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user)
            throw new common_1.NotFoundException('Usuário não encontrado');
        return user;
    }
    removeSensitiveFields(user) {
        const { passwordHash, ...rest } = user;
        return rest;
    }
    async ensureServicesExist(serviceIds) {
        const services = await this.prisma.service.findMany({
            where: { id: { in: serviceIds } },
            select: { id: true },
        });
        const foundIds = services.map(service => service.id);
        const missingIds = serviceIds.filter(id => !foundIds.includes(id));
        if (missingIds.length > 0) {
            throw new common_1.NotFoundException(`Serviço(s) não encontrado(s): ${missingIds.join(', ')}`);
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        upload_service_1.UploadService])
], UserService);
//# sourceMappingURL=user.service.js.map