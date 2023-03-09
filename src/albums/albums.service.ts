import {Injectable} from '@nestjs/common';
import {Album} from "./albums.model";
import {FilesService, FileType} from "../files/files.service";
import {CreateAlbumDto} from "./dto/create-album.dto";
import {InjectModel} from "@nestjs/sequelize";
import { Song } from "../songs/songs.model";

@Injectable()
export class AlbumsService {
    constructor(@InjectModel(Album) private albumRepository: typeof Album,
                @InjectModel(Song) private songRepository: typeof Song,
                private fileService: FilesService) {}


    async create(dto: CreateAlbumDto, image: any) {
        const fileName = await this.fileService.createFile(image, FileType.ALBUMS_IMAGE)
        const album = await this.albumRepository.create({...dto, image: fileName})
        return album
    }

  async getAllAlbums(count: number, offset: number): Promise<Album[]> {
    const albums = this.albumRepository.findAll({
      include: {all: true},
      offset,
      limit: count,
    })
    return albums
  }

  async deleteAlbumById(value: number): Promise<Album> {
      const album = await this.albumRepository.findByPk(value,{include:{all: true}});
      await this.songRepository.destroy({
        where: {
          albumId: value,
        }
      })
      await this.albumRepository.destroy({
      where: {
        id: value,
      }
    })
    return album;
  }
}
