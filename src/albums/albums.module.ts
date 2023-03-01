import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import {AlbumsController} from "./albums.controller";
import {SequelizeModule} from "@nestjs/sequelize";
import {Musician} from "../musicians/musicians.model";
import {Album} from "./albums.model";
import {FilesModule} from "../files/files.module";
import {RolesModule} from "../roles/roles.module";
import {AuthModule} from "../auth/auth.module";
import {Song} from "../songs/songs.model";

@Module({
  providers: [AlbumsService],
  controllers: [AlbumsController],
  imports: [
      SequelizeModule.forFeature([Musician, Album, Song]),
      RolesModule,
      AuthModule,
      FilesModule
  ]
})
export class AlbumsModule {}
