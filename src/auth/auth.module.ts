import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import {MailService} from "./mail.service";
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/users.model";
import {TokensModule} from "../tokens/tokens.module";

@Module({
  providers: [AuthService, MailService],
  controllers: [AuthController],
  imports: [
    SequelizeModule.forFeature([
      User,
    ]),
    TokensModule,
    forwardRef(() => UsersModule),
    JwtModule.register({}),
  ],
  exports: [AuthModule, JwtModule],
})
export class AuthModule {}
