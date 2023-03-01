import {Injectable} from '@nestjs/common';
import {Album} from "./albums.model";
import {FilesService, FileType} from "../files/files.service";
import {CreateAlbumDto} from "./dto/create-album.dto";
import {InjectModel} from "@nestjs/sequelize";

@Injectable()
export class AlbumsService {
    constructor(@InjectModel(Album) private albumRepository: typeof Album,
                private fileService: FilesService) {}


    async create(dto: CreateAlbumDto, image: any) {
        const fileName = await this.fileService.createFile(image, FileType.ALBUMS_IMAGE)
        const album = await this.albumRepository.create({...dto, image: fileName})
        return album
    }
}
