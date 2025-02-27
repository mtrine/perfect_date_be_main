import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { RoleModule } from './modules/role/role.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KeyTokenModule } from './modules/key-token/key-token.module';
import { DatabasesModule } from './modules/databases/databases.module';
import { PlansModule } from './modules/plans/plans.module';
import { ActivitiesModule } from './modules/activities/activities.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { GeminiModule } from './modules/gemini/gemini.module';
import { PostModule } from './modules/post/post.module';
import { UploadModule } from './modules/upload/upload.module';
import { ReportSupportModule } from './modules/report-support/report-support.module';
import { CacheModule } from '@nestjs/cache-manager';
import { createKeyv } from '@keyv/redis';
import { Keyv } from 'keyv';
import { CacheableMemory } from 'cacheable';
import { CacheHandleModule } from './modules/cache-handle/cache-handle.module';
@Module({
  imports: [
    ConfigModule.forRoot(
      { isGlobal: true, }
    ),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
   
    UserModule,
    AuthModule,
    RoleModule,
    PermissionsModule,
    KeyTokenModule, DatabasesModule, PlansModule, ActivitiesModule, NotificationsModule, GeminiModule, PostModule, UploadModule, ReportSupportModule, CacheHandleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
