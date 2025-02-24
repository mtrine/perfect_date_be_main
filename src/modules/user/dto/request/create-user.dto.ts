import {  IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    avatar:string

    @MinLength(3)
    name: string;

    @IsNotEmpty()
    verified: boolean;
}

// @Prop({ required: true })
//     user_email: string;

//     @Prop({ required: true })
//     user_name: string;

//     @Prop({ default: null })
//     user_avatar: string;

//     @Prop({ default: false })
//     user_verified: boolean;

//     @Prop({ enum: UserSex, default: null })
//     user_sex: string;

//     @Prop({ default: null })
//     user_birthdate: Date;