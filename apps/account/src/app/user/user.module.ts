import { Module } from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./models/user.model";
import {UserRepository} from "./repositories/user.repository";
import {UserCommands} from "./user.commands";
import {UserQueries} from "./user.queries";

@Module({
  imports: [
    SequelizeModule.forFeature([
      User
    ])
  ],
  providers: [UserRepository],
  controllers: [UserCommands, UserQueries],
  exports: [UserRepository]
})
export class UserModule {}
