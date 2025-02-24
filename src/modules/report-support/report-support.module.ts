import { Module } from '@nestjs/common';
import { ReportSupportService } from './report-support.service';
import { ReportSupportController } from './report-support.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportSupport, ReportSupportSchema } from './schemas/report-support.schema';
import { ReportSupportRepository } from './report-support.repo';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ReportSupport.name, schema: ReportSupportSchema },
    ]),
  ],
  controllers: [ReportSupportController],
  providers: [ReportSupportService, ReportSupportRepository],
})
export class ReportSupportModule {}
