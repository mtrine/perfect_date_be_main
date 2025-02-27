import { Inject, Injectable } from '@nestjs/common';

import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { promisify } from 'util';

@Injectable()
export class CacheHandleService {
  private trackedKeys: Set<string> = new Set();
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async getCache(key: string) {
    const cacheData = await this.cacheManager.get(key);
    return cacheData;
  }

  async setCache(key: string, value: any) {
    await this.cacheManager.set(key, value);
  }

  async delCache(key: string) {
    await this.cacheManager.del(key);
  }

  async clearACache(pattern: string) {
    const keys = this.getTrackedKeys(pattern);
    for (const key of keys) {
      await this.cacheManager.del(key);
    }
  }

  private getTrackedKeys(pattern: string): string[] {
    const regex = new RegExp(pattern);
    return Array.from(this.trackedKeys).filter(key => regex.test(key));
  }
}
