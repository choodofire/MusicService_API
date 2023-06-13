import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Song } from './songs.model';
import { FilesService, FileType } from '../files/files.service';
import { CreateSongDto } from './dto/create-song.dto';
import { Op } from 'sequelize';

@Injectable()
export class SongsService {
  constructor(
    @InjectModel(Song) private songRepository: typeof Song,
    private fileService: FilesService,
  ) {}

  async create(dto: CreateSongDto, audio: any): Promise<Song> {
    const audioPath = await this.fileService.createFile(audio, FileType.AUDIO);
    const song = await this.songRepository.create({ ...dto, audio: audioPath });
    return song;
  }

  async listen(id: number): Promise<void> {
    const song = await this.songRepository.findByPk(id);
    if (song) {
      song.listens += 1;
      await song.save();
      return;
    }
    throw new HttpException('Песня не найден', HttpStatus.BAD_REQUEST);
  }

  async getOneSong(id: number): Promise<Song> {
    const song = await this.songRepository.findByPk(id);
    return song;
  }

  async searchByName(name: string): Promise<Song[]> {
    return this.songRepository.findAll({
      where: {
        title: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });
  }
}
