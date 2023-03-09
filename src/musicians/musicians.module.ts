import { Module } from '@nestjs/common';
import { MusiciansService } from './musicians.service';
import { MusiciansController } from './musicians.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/users.model";
import {FilesModule} from "../files/files.module";
import {Musician} from "./musicians.model";
import {AuthModule} from "../auth/auth.module";
import {Album} from "../albums/albums.model";
import {RolesModule} from "../roles/roles.module";
import {Song} from "../songs/songs.model";
import { Subscriptions } from "../follow/subscription.model";

@Module({
  providers: [MusiciansService],
  controllers: [MusiciansController],
  imports: [
    SequelizeModule.forFeature([User, Musician, Album, Song, Subscriptions]),
      RolesModule,
    FilesModule,
      AuthModule
  ]
})
export class MusiciansModule {}
