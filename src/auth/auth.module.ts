import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import {MailService} from "./mail.service";
import {SequelizeModule} from "@nestjs/sequelize";
import {Token} from "./tokens/tokens.model";

@Module({
  providers: [AuthService, MailService],
  controllers: [AuthController],
  imports: [
    SequelizeModule.forFeature([
      Token,
    ]),
    forwardRef(() => UsersModule),
    JwtModule.register({}),
  ],
  exports: [AuthModule, JwtModule],
})
export class AuthModule {}
