import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Activity } from "./schemas/activity.schema";
import { Model } from "mongoose";
import { CreateActivityDto } from "./dto/create-activity.dto";
import { time } from "console";
import { UpdateActivityDto } from "./dto/update-activity.dto";
import { UtilsService } from "src/utils/utils.service";

@Injectable()
export class ActivitiesRepository {
    constructor(
        @InjectModel(Activity.name) private readonly activitiesModel: Model<Activity>
    ) { }

    async createActivity(dto: CreateActivityDto) {
        return await this.activitiesModel.create({
            planId: dto.planId,
            title: dto.title,
            location: dto.location,
            time: dto.time,
            notes: dto.notes
        })
    }

    async getActivitiesByPlan(planId: string) {
        return await this.activitiesModel.find({ planId })
            .sort({ time: 1 })
            .lean();
    }

    async createManyActivities(dto: CreateActivityDto[]) {
        const activities = dto.map(activity => ({
            planId: activity.planId,
            title: activity.title,
            location: activity.location,
            time: activity.time, // Chuyển thành kiểu Date
            notes: activity.notes
        }));

        return await this.activitiesModel.insertMany(activities);
    }

    async updateManyActivities(dto: UpdateActivityDto[]) {
        const bulkOps = dto.map((activity) => ({
            updateOne: {
                filter: { _id: activity.activityId },
                update: {
                    $set: UtilsService.removeUndefinedAndNull({
                        title: activity.title,
                        location: activity.location,
                        time: activity.time,
                        notes: activity.notes
                    })
                }
            }
        }));

        return await this.activitiesModel.bulkWrite(bulkOps);

    }
}