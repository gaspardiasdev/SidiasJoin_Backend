import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/databases/connection/prisma.service';
import { CreateSubscriptionDto, UpdateSubscriptionDto } from './subscription.dto';

@Injectable()
export class SubscriptionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateSubscriptionDto) {
    const exists = await this.prisma.subscription.findUnique({ where: { providerId: data.providerId } });
    if (exists) {
      throw new NotFoundException('Prestador já possui Assinatura.');
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

  async findByProviderId(providerId: number) {
    const subscription = await this.prisma.subscription.findUnique({
      where: { providerId },
      include: { provider: true },
    });

    if (!subscription) {
      throw new NotFoundException('Assinatura não encontrada para este prestador.');
    }

    return subscription;
  }

  async update(providerId: number, data: UpdateSubscriptionDto) {
    const exists = await this.prisma.subscription.findUnique({ where: { providerId } });
    if (!exists) {
      throw new NotFoundException('Assinatura não encontrada para este prestador.');
    }

    return this.prisma.subscription.update({
      where: { providerId },
      data,
    });
  }

  async delete(providerId: number) {
    const exists = await this.prisma.subscription.findUnique({ where: { providerId } });

    if (!exists) {
      throw new NotFoundException('Assinatura não encontrada para este prestador.');
    }

    await this.prisma.subscription.delete({
      where: { providerId },
    });
    return { message: 'Assinatura cancelada com sucesso' };
  }
}