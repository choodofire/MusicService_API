import { Module} from '@nestjs/common';
import {TokenService} from "./tokens.service";
import { RedisModule } from '@liaoliaots/nestjs-redis';
import {JwtModule, JwtService} from "@nestjs/jwt";


@Module({
    providers: [TokenService],
    imports: [
        JwtModule.register({}),
        RedisModule.forRoot({
            readyLog: true,
            config: {
                host: 'localhost',
                port: 6379,
            }
        })
    ],
    exports: [TokenService],
})
export class TokensModule {}
