import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/databases/connection/prisma.service';
import { UploadModule } from 'src/utils/upload/upload.module';

@Module({
  imports: [UploadModule],
  controllers: [UserController],
  providers: [UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
