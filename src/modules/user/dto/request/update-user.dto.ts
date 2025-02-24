import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsString()
    @IsOptional()
    user_sex: string;

    @IsString()
    @IsOptional()
    user_birthdate: string;

    @IsString()
    @IsOptional()
    user_avatar: string;
}
