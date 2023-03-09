import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../users/users.model";
import { Musician } from "../musicians/musicians.model";
import { Song } from "../songs/songs.model";
import { RolesService } from "../roles/roles.service";
import { FollowCreateDto } from "./dto/follow-create.dto";
import { Likes } from "./likes.model";
import { Subscriptions } from "./subscription.model";


@Injectable()
export class FollowService {
  constructor(@InjectModel(User) private userRepository: typeof User,
              @InjectModel(Musician) private musicianRepository: typeof Musician,
              @InjectModel(Song) private songRepository: typeof Song,
              @InjectModel(Likes) private likesRepository: typeof Likes,
              @InjectModel(Subscriptions) private subsRepository: typeof Subscriptions,
              private roleService: RolesService) {}


  async createSubscription(dto: FollowCreateDto, userId: number) {
    const user = await this.userRepository.findByPk(userId);
    const musician = await this.musicianRepository.findByPk(dto.followId);
    if (user && musician) {
      await user.$add('musiciansSubscription', musician.id);
      return dto;
    }
    throw new HttpException("Пользователь или музыкант не найдены", HttpStatus.NOT_FOUND);
  }

  async createLikes(dto: FollowCreateDto, userId: number) {
    const user = await this.userRepository.findByPk(userId);
    const song = await this.songRepository.findByPk(dto.followId);
    if (user && song) {
      await user.$add('songsLikes', song.id);
      return dto;
    }
    throw new HttpException("Пользователь или песня не найдены", HttpStatus.NOT_FOUND);
  }

  async removeSubscription(dto: FollowCreateDto, userId: number) {
    await this.subsRepository.destroy({
      where: {
        userId: userId,
        musicianId : dto.followId,
      }
    })
  }

  async removeLikes(dto: FollowCreateDto, userId: number) {
    await this.likesRepository.destroy({
      where: {
          userId: userId,
          songId: dto.followId,
      }
    })
  }
}
