import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UserInterface } from '../user/dto/response/user.interface';
import { User } from 'src/decorators/user-infor.decorator';
import { ResponseMessage } from 'src/decorators/response-message.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/decorators/public.decorator';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post()
  @ResponseMessage("Post created successfully")
  @UseInterceptors(FileInterceptor('file'))
  createPost(@Body() dto: CreatePostDto, @UploadedFile() file: Express.Multer.File, @User() user: UserInterface) {
    dto.createdBy = user._id;
    
    return this.postService.createPost(dto, file);
  }

  @Get("location")
  @Public()
  @ResponseMessage("Posts fetched successfully")
  getPostsByLocation(@Query("city") city: string, @Query("limit") limit: number, @Query("page") page: number) {
    return this.postService.getPostsByLocation(city, limit, page);
  }

  @Get("popular")
  @Public()
  @ResponseMessage("Popular posts fetched successfully")
  getPopularPosts(@Query("limit") limit: number, @Query("page") page: number) {
    return this.postService.getPopularPosts(limit, page);
  }

  @Get("latest")
  @Public()
  @ResponseMessage("Latest posts fetched successfully")
  getLatestPosts(@Query("limit") limit: number, @Query("page") page: number) {
    return this.postService.getLatestPosts(limit, page);
  }

  @Patch("like")
  @ResponseMessage("Post liked successfully")
  likePost(@Body("postId") postId: string, @User() user: UserInterface) {
    const userId = user._id;
    return this.postService.likePost(postId, userId);
  }

  @Patch("unlike")
  @ResponseMessage("Post unliked successfully")
  unlikePost(@Body("postId") postId: string, @User() user: UserInterface) {
    const userId = user._id;
    return this.postService.unlikePost(postId, userId);
  }

  @Get("my-liked")
  @ResponseMessage("My liked posts fetched successfully")
  getMyPostLiked(@User() user: UserInterface) {
    const userId = user._id;
    return this.postService.getMyPostLiked(userId);
  }
}
