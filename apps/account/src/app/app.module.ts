import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import {ConfigModule} from "@nestjs/config";
import {SequelizeModule} from "@nestjs/sequelize";
import {getPostgresConfig} from "./configs/postgres.config";
import {RMQModule} from "nestjs-rmq";
import {getRMQConfig} from "./configs/rmq.config";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: 'envs/.account.env' }),
    SequelizeModule.forRootAsync(getPostgresConfig()),
    RMQModule.forRootAsync(getRMQConfig()),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
