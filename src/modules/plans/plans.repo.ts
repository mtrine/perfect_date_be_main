import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Plan } from "./schemas/plan.schemas";
import { Model, Types } from "mongoose";
import { CreatePlanDto } from "./dto/create-plan.dto";
import { CustomException } from "src/exception-handle/custom-exception";
import { ErrorCode } from "src/enums/error-code.enum";
;

@Injectable()
export class PlansRepository {
    constructor(
        @InjectModel(Plan.name) private readonly planModel: Model<Plan>
    ) { }

    async createPlan(dto: CreatePlanDto) {

        const plan = await this.planModel.create({
            title: dto.title,
            description: dto.description,
            createdBy: dto.createdBy,
            partnerId: dto.partnerId,
            startDate: dto.startDate,
        });

        return plan
    }

    async getPlansByUser(userId: string) {
        return this.planModel.find({
            $or: [{ createdBy: userId }, { partnerId: userId }]
        }).populate("createdBy", "user_name user_email -_id")
            .populate("partnerId", "user_name user_email -_id")
            .lean();
    }

    async getPlanById(planId: string, userId: string) {
        const plan = await this.planModel.findById(planId)
            .populate("createdBy", "user_name user_email -_id")
            .populate("partnerId", "user_name user_email -_id")
            .lean();

        if (!plan) {
            throw new CustomException(ErrorCode.NOT_FOUND);
        }

        const isAuthorized = plan.createdBy?._id.toString() === userId ||
            plan.partnerId?._id.toString() === userId ||
            plan.isPublic;

        if (!isAuthorized) {
            throw new CustomException(ErrorCode.YOU_ARE_NOT_PARTICIPANT);
        }

        return plan;
    }

    async checkIsCreatorOrPartner(planId: string, userId: string) {
        const plan = await this.planModel.findOne({
            _id: planId,
            $or: [{ createdBy: userId }, { partnerId: userId }]
        })
        return plan ? true : false
    }

    async checkIsCreatorOrPartnerOrPublic(planId: string, userId: string) {
        const plan = await this.planModel.findOne({
            _id: planId,
            $or: [{ createdBy: userId }, { partnerId: userId }, { isPublic: true }]
        })
        return plan ? true : false
    }

    async changePlanStatus(planId:string, status:string) {
        if(status === "public") {
            const plan = await this.planModel.findByIdAndUpdate(planId, {
                isPublic: true
            }, { new: true });
            return plan;
        }
        if(status === "private") {
            const plan = await this.planModel.findByIdAndUpdate(planId, {
                isPublic: false
            }, { new: true });
            return plan;
        }

    }
}