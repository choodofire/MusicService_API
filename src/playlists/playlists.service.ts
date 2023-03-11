import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Playlist} from "./playlists.model";
import {CreatePlaylistDto} from "./dto/create-playlist.dto";
import {FilesService, FileType} from "../files/files.service";
import { AddSongToPlaylistDto } from "./dto/add-song-to-playlist.dto";
import { PlaylistSongs } from "./playlist-songs.model";
import { Song } from "../songs/songs.model";
import { User } from "../users/users.model";

@Injectable()
export class PlaylistsService {
    constructor(@InjectModel(Playlist) private playlistRepository: typeof Playlist,
                @InjectModel(PlaylistSongs) private playlistSongsRepository: typeof PlaylistSongs,
                @InjectModel(Song) private songRepository: typeof Song,
                @InjectModel(User) private userRepository: typeof User,
                private fileService: FilesService) {}

    async create(dto: CreatePlaylistDto, image: any, userId: number): Promise<Playlist> {
        const user = this.userRepository.findByPk(userId);
        if (!user) {
          throw new HttpException("Пользователь не найден", HttpStatus.NOT_FOUND)
        }
        const fileName = await this.fileService.createFile(image, FileType.PLAYLIST_IMAGE)
        const playlist = await this.playlistRepository.create({...dto, image: fileName, userId: userId})
        return playlist
    }

  async addSongToPlaylist(dto: AddSongToPlaylistDto): Promise<Song> {
      const song = await this.songRepository.findByPk(dto.songId);
      const playlist = await this.playlistRepository.findByPk(dto.playlistId);
      if (song && playlist) {
        await playlist.$add('song', song.id);
        return song;
      }
    throw new HttpException("Плейлист или песня не найдены", HttpStatus.NOT_FOUND)
  }

  async delete(value: number, userId: number): Promise<void> {
    const playlist = await this.playlistRepository.findByPk(value);
    if (playlist.userId === userId) {
      await playlist.destroy();
    }
    throw new HttpException("Ошибка при удалении плейлиста", HttpStatus.BAD_REQUEST)
  }
}
