import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ReportSupportService } from './report-support.service';
import { CreateReportSupportDto } from './dto/create-report-support.dto';
import { Public } from 'src/decorators/public.decorator';
import { ResponseMessage } from 'src/decorators/response-message.decorator';

@Controller('report-support')
export class ReportSupportController {
  constructor(private readonly reportSupportService: ReportSupportService) {}

  @Post()
  @Public()
  @ResponseMessage('Report support created successfully')
  create(@Body() createReportSupportDto: CreateReportSupportDto) {
    return this.reportSupportService.create(createReportSupportDto);
  }

  @Get()
  @ResponseMessage('Report supports fetched successfully')
  findAll(@Query('limit') limit: number, @Query('page') page: number) {
    return this.reportSupportService.getReportSupports(limit, page);
  }

}
