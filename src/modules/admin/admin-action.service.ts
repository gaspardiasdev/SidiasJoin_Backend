import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/databases/connection/prisma.service';

@Injectable()
export class AdminActionService {
  constructor(private readonly prisma: PrismaService) {}

  async logAction(params: {
    adminId: number;
    providerId: number;
    action: string;
    note?: string;
  }) {
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

  async listByAdmin(adminId: number) {
    return this.prisma.adminAction.findMany({
      where: { adminId },
      orderBy: { createdAt: 'desc' },
      include: {
        provider: true,
      },
    });
  }

  async listByProvider(providerId: number) {
    return this.prisma.adminAction.findMany({
      where: { providerId },
      orderBy: { createdAt: 'desc' },
      include: {
        admin: true,
      },
    });
  }
}
