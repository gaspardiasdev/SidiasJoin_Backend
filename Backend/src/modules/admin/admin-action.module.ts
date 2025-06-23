import { Module } from '@nestjs/common';
import { AdminActionService } from './admin-action.service';
import { AdminActionController } from './admin-action.controller';
import { PrismaService } from 'src/databases/connection/prisma.service';

@Module({
  controllers: [AdminActionController],
  providers: [AdminActionService, PrismaService],
  exports: [AdminActionService],
})
export class AdminActionModule {}