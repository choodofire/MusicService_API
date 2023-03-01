import {Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {CreatePlaylistDto} from "./dto/create-playlist.dto";
import {PlaylistsService} from "./playlists.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";

@ApiTags('Плейлисты')
@Controller('playlists')
export class PlaylistsController {
    constructor(private playlistService: PlaylistsService) {}

    @ApiOperation({summary: 'Создание плейлиста'})
    @ApiResponse({status: 200, type: CreatePlaylistDto})
    @Roles("USER")
    @UseGuards(RolesGuard)
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    createPlaylist(@Body() dto: CreatePlaylistDto,
                   @UploadedFile() image) {
        return this.playlistService.create(dto, image)
    }
}
