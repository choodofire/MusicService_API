import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMusicianDto } from './dto/create-musician.dto';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService, FileType } from '../files/files.service';
import { Musician } from './musicians.model';
import { Op } from 'sequelize';

@Injectable()
export class MusiciansService {
  constructor(
    @InjectModel(Musician) private musicianRepository: typeof Musician,
    private fileService: FilesService,
  ) {}

  async create(
    dto: CreateMusicianDto,
    image: any,
    userId: number,
  ): Promise<Musician> {
    let fileName = 'No photo';
    if (image) {
      fileName = await this.fileService.createFile(
        image,
        FileType.MUSICIANS_AVATARS,
      );
    }

    const candidate = await this.musicianRepository.findOne({
      where: { userId: userId },
    });
    if (candidate) {
      throw new HttpException(
        'Профиль музыканта данного пользователя уже создан',
        HttpStatus.BAD_REQUEST,
      );
    }
    const musician = await this.musicianRepository.create({
      ...dto,
      userId: userId,
      image: fileName,
    });
    return musician;
  }

  async getAllMusicians(): Promise<Musician[]> {
    const musicians = await this.musicianRepository.findAll({
      include: { all: true },
    });
    return musicians;
  }

  async getOneMusicianById(value: number): Promise<Musician> {
    const musician = await this.musicianRepository.findOne({
      where: { id: value },
    });
    return musician;
  }

  async searchByName(name: string): Promise<Musician[]> {
    return this.musicianRepository.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });
  }
}
