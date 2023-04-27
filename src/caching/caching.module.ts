import { Module } from '@nestjs/common';
import { CachingService } from './caching.service';
import { RedisModule } from '@liaoliaots/nestjs-redis';

@Module({
  providers: [CachingService],
  imports: [
    RedisModule.forRoot({
      readyLog: true,
      config: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
  exports: [CachingService],
})
export class CachingModule {}
