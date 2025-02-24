import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ReportSupportService } from './report-support.service';
import { CreateReportSupportDto } from './dto/create-report-support.dto';

@Controller('report-support')
export class ReportSupportController {
  constructor(private readonly reportSupportService: ReportSupportService) {}

  @Post()
  create(@Body() createReportSupportDto: CreateReportSupportDto) {
    return this.reportSupportService.create(createReportSupportDto);
  }

  @Get()
  findAll(@Query('limit') limit: number, @Query('page') page: number) {
    return this.reportSupportService.getReportSupports(limit, page);
  }

}
