import { Injectable } from '@nestjs/common';
import { CreateReportSupportDto } from './dto/create-report-support.dto';
import { UpdateReportSupportDto } from './dto/update-report-support.dto';
import { ReportSupportRepository } from './report-support.repo';
import { UtilsService } from 'src/utils/utils.service';

@Injectable()
export class ReportSupportService {
  constructor(
    private reportSupportRepository: ReportSupportRepository
  ) { }
  async create(createReportSupportDto: CreateReportSupportDto) {
    return await this.reportSupportRepository.createReportSupport(createReportSupportDto);
  }

  async getReportSupports(limit: number = 10, page: number = 1) {
    const skip = (page - 1) * limit;
    const reportSupports = await this.reportSupportRepository.getReportSupports(limit, skip);
    return UtilsService.paginateResponse(reportSupports, limit, page);
  }
}
