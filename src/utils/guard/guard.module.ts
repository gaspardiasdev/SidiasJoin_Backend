import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles.guard';
import { Reflector } from '@nestjs/core';
import { AuthModule } from 'src/modules/Auth/auth.module';
import { JwtAuthGuard } from './auth.guard';

@Module({
  imports: [AuthModule],
  providers: [
    Reflector,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class GuardModule {}
