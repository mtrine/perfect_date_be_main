import { Injectable } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { ActivitiesRepository } from './activities.repo';
import { PlansRepository } from '../plans/plans.repo';
import { UtilsService } from 'src/utils/utils.service';

@Injectable()
export class ActivitiesService {
  constructor(
    private readonly activitiesRepository: ActivitiesRepository,
    private readonly plansRepository: PlansRepository
  ) { }

  async create(createActivityDto: CreateActivityDto, userId: string) {
    const isExist = await this.plansRepository.checkIsCreatorOrPartner(createActivityDto.planId, userId);

    if (isExist) {
      return await this.activitiesRepository.createActivity(createActivityDto);
    }
  }

  async getActivitiesByPlan(planId: string) {
    return await this.activitiesRepository.getActivitiesByPlan(planId);
  }

  async createManyActivities(dto: CreateActivityDto[]) {
    return await this.activitiesRepository.createManyActivities(dto);
  }

  async updateManyActivities(dto: UpdateActivityDto[]) {
    return await this.activitiesRepository.updateManyActivities(dto);
  }
}
