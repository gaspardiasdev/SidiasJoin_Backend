import { Module } from '@nestjs/common';
import { PrismaService } from 'src/databases/connection/prisma.service';
import { ServiceController } from './services.controller';
import { ServicesService } from './services.service';
@Module({
  controllers: [ServiceController],
  providers: [ServicesService, PrismaService],
})
export class ServicesModule {}
