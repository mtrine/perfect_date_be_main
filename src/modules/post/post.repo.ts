import { Injectable } from "@nestjs/common";
import { Post } from "./schemas/post.schema";
import { Model, Types } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CreatePostDto } from "./dto/create-post.dto";
import { CustomException } from "src/exception-handle/custom-exception";
import { ErrorCode } from "src/enums/error-code.enum";

@Injectable()
export class PostRepository {
    constructor(
        @InjectModel(Post.name) private postModel: Model<Post>
    ) { }

    async createPost(dto: CreatePostDto) {
        const post = await this.postModel.create({
            content: dto.content,
            createdBy: dto.createdBy,
            planId: dto.planId,
            image: dto.image,
            city: dto.city,
            title: dto.title
        });
        return post;
    }

    async findPostByLocation(city: string, limit: number, skip: number) {
        const post = await this.postModel.find({
            city: city
        })
        .populate("createdBy","user_name image user_email -_id")
        .skip(skip)
        .limit(limit)
        .lean();
        
        return post;
    }


    async getPopularPost(limit: number, skip: number) {
        const post = await this.postModel.find()
            .populate("createdBy","user_name image user_email -_id")
            .sort({ likedBy: -1, createdAt: -1 })
            .limit(limit)
            .skip(skip)
            .lean();
        return post;
    }

    async getLatestPost(limit: number, skip: number) {
        const post = await this.postModel.find()
            .populate("createdBy","user_name image user_email -_id")
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skip)
            .lean();
        return post;
    }


    async likePost(postId: string, userId: string) {
        const post = await this.postModel.findByIdAndUpdate(postId, {
            $push: {
                likedBy: userId
            }
        }, { new: true });
        return post;
    }

    async unlikePost(postId: string, userId: string) {
        const post = await this.postModel.findByIdAndUpdate(postId, {
            $pull: {
                likedBy: userId
            }
        }, { new: true }
        );
        return post;
    }

    async checkLiked(postId: string, userId: string) {
        const post = await this.postModel.findById(postId);
        if (!post) {
            throw new CustomException(ErrorCode.NOT_FOUND);
        }
        return post.likedBy.includes(new Types.ObjectId(userId));
    }

    async getMyPostLiked(userId: string) {
        const post = await this.postModel.find({
            likedBy: userId
        }).populate("createdBy").lean();
        return post;
    }
}