import { Injectable } from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {GenerateUserTokenDto} from "../auth/dto/generate-user-token.dto";
import { RedisService, DEFAULT_REDIS_NAMESPACE } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';

@Injectable()
export class TokenService {
    private readonly redis: Redis;

    constructor(
        private jwtService: JwtService,
        private readonly redisService: RedisService,
    ) {
        this.redis = this.redisService.getClient();
    }

    async saveToken(userId: number, value: string) {
        const set = await this.redis.set(String(userId), value)
        return set
    }

    async getToken(userId: number): Promise<string> {
        const token = await this.redis.get(String(userId));
        return token;
    }

    async removeToken(userId: number) {
        const rem = await this.redis.del(String(userId));
        return rem
    }

    async generateToken(user: GenerateUserTokenDto) {
        const payload = { email: user.email, id: user.id, roles: user.roles, isActivated: user.isActivated };
        return {
            accessToken: this.jwtService.sign(payload, {
                privateKey: process.env.JWT_ACCESS_SECRET,
                expiresIn: '30m',
            }),
            refreshToken: this.jwtService.sign(payload, {
                privateKey: process.env.JWT_REFRESH_SECRET,
                expiresIn: '30d',
            }),
        };
    }
}
