import { Module} from '@nestjs/common';
import {TokenService} from "./tokens.service";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/users.model";
import {Ban} from "../users/bans.model";
import {Token} from "./tokens.model";

@Module({
    providers: [TokenService],
    imports: [
        JwtModule.register({}),
        SequelizeModule.forFeature([
            User,
            Token,
        ]),
    ],
    exports: [TokenService],
})
export class TokensModule {}
