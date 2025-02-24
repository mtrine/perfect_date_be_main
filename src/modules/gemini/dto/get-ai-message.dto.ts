import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class GetAiMessageDto {
    @IsNotEmpty()
    @IsString()
    prompt:string;

    @IsOptional()
    @IsString()
    sessionId?:string;
}

