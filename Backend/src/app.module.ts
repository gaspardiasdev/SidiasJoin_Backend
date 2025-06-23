import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/Auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { ServicesModule } from './modules/services/services.module';
import { ReviewModule } from './modules/review/review.module';
import { SubscriptionModule } from './modules/subscription/subscription.module';
import { LikeModule } from './modules/like/like.module';
import { AdminActionModule } from './modules/admin/admin-action.module';
import { GuardModule } from './utils/guard/guard.module';

@Module({
  imports: [
    UserModule, 
    AuthModule, 
    CategoryModule, 
    ServicesModule, 
    ReviewModule, 
    SubscriptionModule,
    LikeModule,
    AdminActionModule,
    GuardModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
