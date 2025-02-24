import { IsNotEmpty, IsOptional, MinLength } from "class-validator";

export class CreateActivityDto {

    @IsNotEmpty()
    planId: string;

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    time: string;

    @IsNotEmpty()
    @MinLength(6)
    location: string;

    @IsOptional()
    notes: string;
}
