import { Module } from '@nestjs/common';
import { PlansService } from './plans.service';
import { PlansController } from './plans.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Plan, PlanSchema } from './schemas/plan.schemas';
import { PlansRepository } from './plans.repo';
import { NotificationsModule } from '../notifications/notifications.module';
import { UserModule } from '../user/user.module';
import { CacheHandleModule } from '../cache-handle/cache-handle.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Plan.name,
        schema: PlanSchema,
      },
    ]),
    NotificationsModule,
    UserModule,
    CacheHandleModule
  ],
  controllers: [PlansController],
  providers: [PlansService, PlansRepository],
  exports:[PlansService,PlansRepository]
})
export class PlansModule { }
