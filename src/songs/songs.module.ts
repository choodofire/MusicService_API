import { Module } from '@nestjs/common';
import {SongsService} from "./songs.service";
import {SongsController} from "./songs.controller";
import {SequelizeModule} from "@nestjs/sequelize";
import {Musician} from "../musicians/musicians.model";
import {Album} from "../albums/albums.model";
import {Song} from "./songs.model";
import {RolesModule} from "../roles/roles.module";
import {AuthModule} from "../auth/auth.module";
import {FilesModule} from "../files/files.module";
import { Playlist } from "../playlists/playlists.model";
import { PlaylistSongs } from "../playlists/playlist-songs.model";
import { Likes } from "../follow/likes.model";

@Module({
    providers: [SongsService],
    controllers: [SongsController],
    imports: [
        SequelizeModule.forFeature([Musician, Album, Song, Playlist, PlaylistSongs, Likes]),
        RolesModule,
        AuthModule,
        FilesModule
    ]
})
export class SongsModule {}
