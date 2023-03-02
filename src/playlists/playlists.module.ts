import { Module } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { PlaylistsController } from './playlists.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/users.model";
import {Playlist} from "./playlists.model";
import {FilesModule} from "../files/files.module";
import {RolesModule} from "../roles/roles.module";
import {AuthModule} from "../auth/auth.module";
import { PlaylistSongs } from "./playlist-songs.model";
import { Song } from "../songs/songs.model";

@Module({
  providers: [PlaylistsService],
  controllers: [PlaylistsController],
  imports: [
    SequelizeModule.forFeature([User, Playlist, PlaylistSongs, Song]),
      RolesModule,
      AuthModule,
      FilesModule
  ]
})
export class PlaylistsModule {}
