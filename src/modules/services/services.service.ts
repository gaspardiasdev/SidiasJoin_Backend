import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/databases/connection/prisma.service';
import { CreateServiceRequestDTO, UpdateServiceRequestDTO } from './services.dto';
import { ProviderWithServicesDTO, UserResponseDTO } from '../user/user.dto';

@Injectable()
export class ServicesService {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: CreateServiceRequestDTO) {
        const category = await this.prisma.category.findUnique({ where: { id: data.categoryId } });
        if (!category) {
            throw new NotFoundException('Categoria não encontrada.');
        }
        const nameExists = await this.prisma.service.findUnique({
            where: { name: data.name },
        });

        if (nameExists) {
            throw new ConflictException('Já existe um serviço com este nome.');
        }

        return this.prisma.service.create({ data });
    }

    async list(categoryId?: number, name?: string) {
        return this.prisma.service.findMany({
            where: {
                categoryId: categoryId || undefined,
                name: name
                    ? {
                        contains: name,
                        mode: 'insensitive',
                    } as any
                    : undefined,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }


    async findById(id: number) {
        const service = await this.prisma.service.findUnique({ where: { id } });

        if (!service) {
            throw new NotFoundException('Serviço não encontrado.');
        }

        return service;
    }

    async update(id: number, data: UpdateServiceRequestDTO) {
        const existing = await this.prisma.service.findUnique({ where: { id } });

        if (!existing) {
            throw new NotFoundException('Serviço não encontrado.');
        }

        if (data.name && data.name !== existing.name) {
            const nameTaken = await this.prisma.service.findUnique({
                where: { name: data.name },
            });

            if (nameTaken) {
                throw new ConflictException('Já existe um serviço com este nome.');
            }
        }

        return this.prisma.service.update({
            where: { id },
            data,
        });
    }

    async delete(id: number) {
        const existing = await this.prisma.service.findUnique({ where: { id } });
        if (!existing) {
            throw new NotFoundException('Serviço não encontrado.');
        }
        await this.prisma.service.delete({ where: { id } });
        return { message: 'Serviço deletado com sucesso' };
    }

    async findProvidersByService(serviceId: number) {
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

}
