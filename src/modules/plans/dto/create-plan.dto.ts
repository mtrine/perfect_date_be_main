import { IsMongoId, IsNotEmpty, IsOptional } from "class-validator";

export class CreatePlanDto {

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsOptional()
    createdBy: string;

    @IsOptional()
    partnerId: string;

    @IsNotEmpty()
    startDate: string;
}
