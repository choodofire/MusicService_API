import {forwardRef, Module} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./users.model";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";
import {RolesModule} from "../roles/roles.module";
import {AuthModule} from "../auth/auth.module";
import {Playlist} from "../playlists/playlists.model";
import {Musician} from "../musicians/musicians.model";
import {Ban} from "./bans.model";
import { Subscriptions } from "./subscription.model";
import { Likes } from "./likes.model";
import { Song } from "../songs/songs.model";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
      SequelizeModule.forFeature([User, Role, UserRoles, Playlist, Musician, Ban, Subscriptions, Likes, Song]),
      RolesModule,
      forwardRef(() => AuthModule)
  ],
    exports: [
        UsersService,
    ]
})
export class UsersModule {}
