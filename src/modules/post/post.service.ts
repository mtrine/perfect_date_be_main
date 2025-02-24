import { Inject, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepository } from './post.repo';
import { PlansRepository } from '../plans/plans.repo';
import { ErrorCode } from 'src/enums/error-code.enum';
import { CustomException } from 'src/exception-handle/custom-exception';
import { UploadService } from '../upload/upload.service';
import { UtilsService } from 'src/utils/utils.service';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class PostService {
  constructor(
    private postRepository: PostRepository,
    private planRepository: PlansRepository,
    private uploadService: UploadService,
  ){}

  async createPost(dto: CreatePostDto, file: Express.Multer.File) {
    const plan = await this.planRepository.checkIsCreatorOrPartner(dto.planId, dto.createdBy.toString());
    if(!plan) {
      throw new CustomException(ErrorCode.YOU_ARE_NOT_PARTICIPANT);
    }
    if(file) {
      const uploadResult = await this.uploadService.uploadFile(file, 'posts');
      dto.image = uploadResult.secure_url;
    }
    else {
      dto.image = "";
    }
    const post = await this.postRepository.createPost(dto);
    if(post){
      await this.planRepository.changePlanStatus(dto.planId, "public");
    }
    return post;
  }
  
  async getPostsByLocation(city:string, limit:number = 10, page:number = 1) {
    
    const skip = (page - 1) * limit;
    const posts = await this.postRepository.findPostByLocation(city, limit, skip);
    const formattedPosts = UtilsService.paginateResponse(posts, limit, page);
    return formattedPosts;
  }

  async getPopularPosts(limit:number = 10, page:number = 1) {
    const skip = (page - 1) * limit;
    const posts = await this.postRepository.getPopularPost(limit, skip);
    const formattedPosts = UtilsService.paginateResponse(posts, limit, page);
    return formattedPosts;
  }

  async getLatestPosts(limit:number = 10, page:number = 1) {
   
    const skip = (page - 1) * limit;
    const posts = await this.postRepository.getLatestPost(limit, skip);
    const formattedPosts = UtilsService.paginateResponse(posts, limit, page);
    return formattedPosts;
  }

  async likePost(postId:string, userId:string) {
    const post = await this.postRepository.likePost(postId, userId);
    return post;
  }

  async unlikePost(postId:string, userId:string) {
    const post = await this.postRepository.unlikePost(postId, userId);
    return post;
  }

  async getMyPostLiked(userId:string) {
    
    const posts = await this.postRepository.getMyPostLiked(userId);
    return posts;
  }
    
}
