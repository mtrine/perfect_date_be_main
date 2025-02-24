import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateActivityDto } from './create-activity.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateActivityDto extends OmitType(CreateActivityDto, ['planId'] as const)  {
    @IsNotEmpty()
    @IsString()
    activityId: string;
}
