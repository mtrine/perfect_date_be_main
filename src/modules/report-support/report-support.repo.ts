import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ReportSupport } from "./schemas/report-support.schema";
import { Model } from "mongoose";
import { CreateReportSupportDto } from "./dto/create-report-support.dto";

@Injectable()
export class ReportSupportRepository {
    constructor(
        @InjectModel(ReportSupport.name) private reportSupportModel: Model<ReportSupport>
    ){
        
    }
    async createReportSupport(dto: CreateReportSupportDto) {
        const reportSupport = await this.reportSupportModel.create({
            email: dto.email,
            phone: dto.phone,
            familyName: dto.familyName,
            givenName: dto.givenName,
            message: dto.message,
        });
        return reportSupport;
    }

    async getReportSupports(limit: number, skip: number) {
        
        const reportSupports = await this.reportSupportModel.find().skip(skip).limit(limit).sort({ createdAt: -1 }).lean();
        return reportSupports;
    }
}
