import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Album } from './albums.model';
import { FilesService, FileType } from '../files/files.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Song } from '../songs/songs.model';
import { Musician } from '../musicians/musicians.model';
import { Op } from 'sequelize';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectModel(Album) private albumRepository: typeof Album,
    @InjectModel(Song) private songRepository: typeof Song,
    @InjectModel(Musician) private musicianRepository: typeof Musician,
    private fileService: FilesService,
  ) {}

  async create(
    dto: CreateAlbumDto,
    image: any,
    userId: number,
  ): Promise<Album> {
    const musician = await this.musicianRepository.findOne({
      where: { userId: userId },
    });
    if (!musician) {
      throw new HttpException('Музыкант не найден', HttpStatus.NOT_FOUND);
    }

    let fileName = 'noPhoto';
    if (image) {
      fileName = await this.fileService.createFile(
        image,
        FileType.ALBUMS_IMAGE,
      );
    }

    const album = await this.albumRepository.create({
      ...dto,
      image: fileName,
      musicianId: musician.id,
    });
    return album;
  }

  async getAllAlbums(count: number, offset: number): Promise<Album[]> {
    const albums = this.albumRepository.findAll({
      include: { all: true },
      offset,
      limit: count,
    });
    return albums;
  }

  async deleteAlbumById(value: number, userId: number): Promise<Album> {
    const album = await this.albumRepository.findByPk(value, {
      include: { all: true },
    });
    if (!album) {
      throw new HttpException('Альбом не найден', HttpStatus.NOT_FOUND);
    }

    const musician = await this.musicianRepository.findOne({
      where: { userId: userId },
    });
    if (!musician) {
      throw new HttpException('Исполнитель не найден', HttpStatus.NOT_FOUND);
    }

    if (album.musicianId === musician.id) {
      await this.songRepository.destroy({
        where: {
          albumId: value,
        },
      });
      await album.destroy();
      return album;
    }

    throw new HttpException(
      'Ошибка при удалении альбома',
      HttpStatus.BAD_REQUEST,
    );
  }

  async searchByName(name: string): Promise<Album[]> {
    return this.albumRepository.findAll({
      where: {
        title: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });
  }
}
