import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlansService } from './plans.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { User } from 'src/decorators/user-infor.decorator';
import { UserInterface } from '../user/dto/response/user.interface';
import { ResponseMessage } from 'src/decorators/response-message.decorator';

@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) { }

  @Post()
  @ResponseMessage('Plan created')
  create(@Body() createPlanDto: CreatePlanDto, @User() user: UserInterface) {
    createPlanDto.createdBy = user._id;
    return this.plansService.create(createPlanDto);
  }


  @Get()
  @ResponseMessage('Fetch list plans successfully')
  getMyPlanList(@User() user: UserInterface) {
    return this.plansService.getPlanList(user._id);
  }

  @Get(':id')
  @ResponseMessage('Plan found')
  getPlanById(@Param('id') id: string, @User() user: UserInterface) {
    return this.plansService.getPlanById(id, user._id);
  }
}
