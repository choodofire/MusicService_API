import { Module } from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./models/user.model";
import {UserRepository} from "./repositories/user.repository";

@Module({
  imports: [
    SequelizeModule.forFeature([
      User
    ])
  ],
  providers: [UserRepository],
  exports: [UserRepository]
})
export class UserModule {}
