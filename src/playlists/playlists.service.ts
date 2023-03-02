import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Playlist} from "./playlists.model";
import {CreatePlaylistDto} from "./dto/create-playlist.dto";
import {FilesService, FileType} from "../files/files.service";
import { AddSongToPlaylistDto } from "./dto/add-song-to-playlist.dto";
import { PlaylistSongs } from "./playlist-songs.model";
import { Song } from "../songs/songs.model";

@Injectable()
export class PlaylistsService {
    constructor(@InjectModel(Playlist) private playlistRepository: typeof Playlist,
                @InjectModel(PlaylistSongs) private playlistSongsRepository: typeof PlaylistSongs,
                @InjectModel(Song) private songRepository: typeof Song,
                private fileService: FilesService) {}

    async create(dto: CreatePlaylistDto, image: any) {
        const fileName = await this.fileService.createFile(image, FileType.PLAYLIST_IMAGE)
        const playlist = await this.playlistRepository.create({...dto, image: fileName})
        return playlist
    }

  async addSongToPlaylist(dto: AddSongToPlaylistDto) {
      const song = await this.songRepository.findByPk(dto.songId);
      const playlist = await this.playlistRepository.findByPk(dto.playlistId);
      if (song && playlist) {
        await playlist.$add('song', song.id);
        return dto;
      }
    throw new HttpException("Плейлист или песня не найдены", HttpStatus.NOT_FOUND)
  }
}
