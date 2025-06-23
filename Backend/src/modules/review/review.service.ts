import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/databases/connection/prisma.service';
import { CreateReviewDto, UpdateReviewDto } from './review.dto';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateReviewDto) {
    if (dto.providerId === dto.clientId) {
      throw new BadRequestException('Você não pode avaliar a si mesmo.');
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
      throw new BadRequestException('Você já avaliou esse prestador.');
    }

    return this.prisma.review.create({
      data: dto,
    });
  }

  async update(providerId: number, clientId: number, dto: UpdateReviewDto) {
    const review = await this.prisma.review.findUnique({
      where: {
        providerId_clientId: { providerId, clientId },
      },
    });

    if (!review) {
      throw new NotFoundException('Avaliação não encontrada.');
    }

    return this.prisma.review.update({
      where: {
        providerId_clientId: { providerId, clientId },
      },
      data: dto,
    });
  }

  async delete(providerId: number, clientId: number) {
    const review = await this.prisma.review.findUnique({
      where: {
        providerId_clientId: { providerId, clientId },
      },
    });

    if (!review) {
      throw new NotFoundException('Avaliação não encontrada.');
    }
    await this.prisma.review.delete({
      where: {
        providerId_clientId: { providerId, clientId },
      },
    });
    return { message: 'Avaliação deletada com sucesso' };
  }

  async listByProvider(providerId: number) {
    return this.prisma.review.findMany({
      where: { providerId },
      include: {
        client: { select: { id: true, name: true, imageUrl: true } },
      },
    });
  }

  async listByClient(clientId: number) {
    return this.prisma.review.findMany({
      where: { clientId },
      include: {
        provider: { select: { id: true, name: true, imageUrl: true } },
      },
    });
  }

  async findUnique(providerId: number, clientId: number) {
    return this.prisma.review.findUnique({
      where: {
        providerId_clientId: { providerId, clientId },
      },
    });
  }
}
