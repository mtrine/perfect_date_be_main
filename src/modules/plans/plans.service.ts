import { Injectable } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { PlansRepository } from './plans.repo';
import { CustomException } from 'src/exception-handle/custom-exception';
import { ErrorCode } from 'src/enums/error-code.enum';
import { NotificationsService } from '../notifications/notifications.service';
import { UserRepository } from '../user/user.repo';
import { NotificationType } from 'src/enums/notification-type';

@Injectable()
export class PlansService {
  constructor(
    private plansRepository: PlansRepository,
    private notificationService: NotificationsService,
    private userRepository: UserRepository
  ) { }

  async create(createPlanDto: CreatePlanDto) {
    const partner= await this.userRepository.getPartner(createPlanDto.createdBy) as any ;
    if(!partner.your_partner) {
      throw new CustomException(ErrorCode.PARTNER_NOT_FOUND);
    }
    createPlanDto.partnerId = partner.your_partner._id ;
    const newPlan = await this.plansRepository.createPlan(createPlanDto);
    if (!newPlan) {
      throw new CustomException(ErrorCode.CREATE_PLAN_FAILED);
    }
    const scheduledAt = new Date(createPlanDto.startDate);
    scheduledAt.setDate(scheduledAt.getDate() - 1);
    await this.notificationService.scheduleNotification({
      userId:[createPlanDto.createdBy, createPlanDto.partnerId],
      type: NotificationType.SCHEDULED ,
      options:{
        planId: newPlan._id,
        title: newPlan.title,
        description: newPlan.description,
        startDate: newPlan.startDate,
      },
      scheduledAt: scheduledAt,
    })
    return newPlan;
  }

  async getPlanList(userId: string) {
    return await this.plansRepository.getPlansByUser(userId);
  }

  async getPlanById(planId: string, userId: string) {
    return await this.plansRepository.getPlanById(planId, userId);
  }

}
