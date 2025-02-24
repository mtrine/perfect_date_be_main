import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateNotificationDto {

    @IsNotEmpty()
    userId: string[];

    @IsString()
    @IsNotEmpty()
    type:string  
   
    @IsNotEmpty()
    scheduledAt: Date;

    @IsOptional()
    options: Object
}


