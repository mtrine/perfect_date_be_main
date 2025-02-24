import { Test, TestingModule } from '@nestjs/testing';
import { ReportSupportService } from './report-support.service';

describe('ReportSupportService', () => {
  let service: ReportSupportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportSupportService],
    }).compile();

    service = module.get<ReportSupportService>(ReportSupportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
