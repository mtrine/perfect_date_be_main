import { Test, TestingModule } from '@nestjs/testing';
import { ReportSupportController } from './report-support.controller';
import { ReportSupportService } from './report-support.service';

describe('ReportSupportController', () => {
  let controller: ReportSupportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportSupportController],
      providers: [ReportSupportService],
    }).compile();

    controller = module.get<ReportSupportController>(ReportSupportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
