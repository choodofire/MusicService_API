import { Injectable } from '@nestjs/common';
import Redis from "ioredis";
import {RedisService} from "@liaoliaots/nestjs-redis";

@Injectable()
export class CachingService {
    private readonly redis: Redis;
    constructor(
        private readonly redisService: RedisService,
    ) {
        this.redis = this.redisService.getClient();
    }

    // async saveToken(userId: number, value: string) {
    //     const set = await this.redis.set(String(userId), value)
    //     return set
    // }
    //
    // async getToken(userId: number): Promise<string> {
    //     const token = await this.redis.get(String(userId));
    //     return token;
    // }
    //
    // async removeToken(userId: number) {
    //     const rem = await this.redis.del(String(userId));
    //     return rem
    // }

}
