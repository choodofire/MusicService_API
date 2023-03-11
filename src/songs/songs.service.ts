import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Song} from "./songs.model";
import {FilesService, FileType} from "../files/files.service";
import {CreateSongDto} from "./dto/create-song.dto";

@Injectable()
export class SongsService {
    constructor(@InjectModel(Song) private songRepository: typeof Song,
                private fileService: FilesService) {}

    async create(dto: CreateSongDto, audio: any): Promise<Song> {
        const audioPath = await this.fileService.createFile( audio, FileType.AUDIO)
        const song = await this.songRepository.create({...dto, audio: audioPath});
        return song;
    }

    async listen(id: number): Promise<void> {
        const song = await this.songRepository.findByPk(id);
        song.listens += 1;
        await song.save();
    }

    // async search(query: string): Promise<Song[]> {
    //     const songs = await this.songRepository.search(query);
    //     return songs;
    // }

    async getOneSong(id: number): Promise<Song> {
        const song = await this.songRepository.findByPk(id);
        return song;
    }
}
