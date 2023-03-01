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

@Module({
    providers: [SongsService],
    controllers: [SongsController],
    imports: [
        SequelizeModule.forFeature([Musician, Album, Song]),
        RolesModule,
        AuthModule,
        FilesModule
    ]
})
export class SongsModule {}
