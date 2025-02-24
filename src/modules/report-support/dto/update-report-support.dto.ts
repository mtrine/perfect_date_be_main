import { PartialType } from '@nestjs/mapped-types';
import { CreateReportSupportDto } from './create-report-support.dto';

export class UpdateReportSupportDto extends PartialType(CreateReportSupportDto) {}
