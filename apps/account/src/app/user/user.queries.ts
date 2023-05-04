import {Body, Controller} from '@nestjs/common';
import {RMQRoute, RMQValidate} from "nestjs-rmq";
import { AccountUserInfo, AccountUserPlaylists } from "@music_service_api/contracts";
import {UserRepository} from "./repositories/user.repository";
import {UserEntity} from "./entities/user.entity";

@Controller()
export class UserQueries {
  constructor(private readonly userRepository: UserRepository) {}

  @RMQValidate()
  @RMQRoute(AccountUserInfo.topic)
  async userInfo(@Body() { id }: AccountUserInfo.Request): Promise<AccountUserInfo.Response> {
    const user = await this.userRepository.findUserById(id);
    const profile = new UserEntity(user).getPublicProfile();
    return {
      profile
    }
  }

  @RMQValidate()
  @RMQRoute(AccountUserPlaylists.topic)
  async userPlaylists(@Body() { id }: AccountUserPlaylists.Request): Promise<AccountUserPlaylists.Response> {
    const user = await this.userRepository.findUserById(id);
    return {
      playlists: user.playlists
    }
  }
}
