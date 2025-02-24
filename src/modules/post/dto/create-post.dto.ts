import { IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Types } from "mongoose";

export class CreatePostDto {
    @IsNotEmpty()
    @IsMongoId()
    planId: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsOptional()
    @IsNotEmpty()
    @IsMongoId()
    createdBy: string;

    @IsOptional()
    image: string;

    @IsNotEmpty()
    city: string;

    @IsNotEmpty()
    @IsString()
    title: string;

}

    

  