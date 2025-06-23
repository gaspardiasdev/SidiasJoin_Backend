import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLikeDto } from './like.dto';
import { PrismaService } from 'src/databases/connection/prisma.service';

@Injectable()
export class LikeService {
    constructor(private readonly prisma: PrismaService) { }


    async like(dto: CreateLikeDto) {
        return this.prisma.like.create({
            data: {
                clientId: dto.clientId,
                providerId: dto.providerId,
            },
        });
    }

    async unlike(clientId: number, providerId: number) {
        return this.prisma.like.delete({
            where: {
                clientId_providerId: { clientId, providerId },
            },
        });
    }

    async exists(clientId: number, providerId: number) {
        const like = await this.prisma.like.findUnique({
            where: {
                clientId_providerId: { clientId, providerId },
            },
        });
        return !!like;
    }

    async toggle(dto: CreateLikeDto) {
        const { clientId, providerId } = dto;
        const alreadyLiked = await this.exists(clientId, providerId);
        if (alreadyLiked) {
            await this.unlike(clientId, providerId);
            return { liked: false, message: 'Like removido com sucesso.' };
        }
        await this.like(dto);
        return { liked: true, message: 'Like criado com sucesso.' };
    }

    async listClientsWhoLiked(providerId: number) {
        return this.prisma.like.findMany({
            where: { providerId },
            include: {
                client: true,
            },
        });
    }

    async listProvidersLikedByClient(clientId: number) {
        return this.prisma.like.findMany({
            where: { clientId },
            include: {
                provider: true,
            },
        });
    }
}