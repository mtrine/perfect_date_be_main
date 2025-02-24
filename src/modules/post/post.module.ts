import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './schemas/post.schema';
import { PlansModule } from '../plans/plans.module';
import { PostRepository } from './post.repo';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    PlansModule,
    UploadModule
  ],
  controllers: [PostController],
  providers: [PostService,PostRepository],
})
export class PostModule {}
