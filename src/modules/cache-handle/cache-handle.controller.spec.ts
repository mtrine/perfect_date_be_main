import { Test, TestingModule } from '@nestjs/testing';
import { CacheHandleController } from './cache-handle.controller';
import { CacheHandleService } from './cache-handle.service';

describe('CacheHandleController', () => {
  let controller: CacheHandleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CacheHandleController],
      providers: [CacheHandleService],
    }).compile();

    controller = module.get<CacheHandleController>(CacheHandleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
