import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class GetAiMessageDto {
    @IsNotEmpty()
    @IsString()
    yourAddress: string;

    @IsNotEmpty()
    @IsString()
    distance: string;

    @IsNotEmpty()
    @IsString()
    style:string;

    @IsOptional()
    @IsString()
    note:string;

    @IsOptional()
    @IsString()
    sessionId?:string;
}

