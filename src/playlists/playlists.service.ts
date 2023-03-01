import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Playlist} from "./playlists.model";
import {CreatePlaylistDto} from "./dto/create-playlist.dto";
import {FilesService, FileType} from "../files/files.service";

@Injectable()
export class PlaylistsService {
    constructor(@InjectModel(Playlist) private playlistRepository: typeof Playlist,
                private fileService: FilesService) {}

    async create(dto: CreatePlaylistDto, image: any) {
        const fileName = await this.fileService.createFile(image, FileType.PLAYLIST_IMAGE)
        const playlist = await this.playlistRepository.create({...dto, image: fileName})
        return playlist
    }
}
