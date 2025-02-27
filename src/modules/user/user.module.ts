import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserRepository } from './user.repo';
import { UploadModule } from '../upload/upload.module';
import { CacheHandleModule } from '../cache-handle/cache-handle.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    UploadModule,
    CacheHandleModule
  ],
  controllers: [UserController],
  providers: [UserService,UserRepository],
  exports: [UserService,UserRepository]
})
export class UserModule {}
