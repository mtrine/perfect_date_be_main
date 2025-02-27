import { Test, TestingModule } from '@nestjs/testing';
import { CacheHandleService } from './cache-handle.service';

describe('CacheHandleService', () => {
  let service: CacheHandleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CacheHandleService],
    }).compile();

    service = module.get<CacheHandleService>(CacheHandleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
