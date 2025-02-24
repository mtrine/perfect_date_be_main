import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { ResponseMessage } from 'src/decorators/response-message.decorator';
import { User } from 'src/decorators/user-infor.decorator';
import { UserInterface } from '../user/dto/response/user.interface';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) { }

  @Post()
  @ResponseMessage("Activity created successfully")
  create(@Body() createActivityDto: CreateActivityDto, @User() user: UserInterface) {
    return this.activitiesService.create(createActivityDto,user._id);
  }

  @Get('/plan/:planId')
  @ResponseMessage("Activities retrieved successfully")
  getActivitiesByPlan(@Param('planId') planId: string) {
    return this.activitiesService.getActivitiesByPlan(planId);
  }

  @Post('/many')
  @ResponseMessage("Activities created successfully")
  createManyActivities(@Body('activities') createActivityDto: CreateActivityDto[]) {
    return this.activitiesService.createManyActivities(createActivityDto);
  }

  @Patch('/many')
  @ResponseMessage("Activities updated successfully")
  updateManyActivities(@Body('activities') updateActivityDto: UpdateActivityDto[]) {
    return this.activitiesService.updateManyActivities(updateActivityDto);
  }
}
