import {Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {FileInterceptor} from "@nestjs/platform-express";
import {AlbumsService} from "./albums.service";
import {CreateAlbumDto} from "./dto/create-album.dto";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";

@ApiTags('Альбомы')
@Controller('albums')
export class AlbumsController {
    constructor(private albumService: AlbumsService) {}

    @ApiOperation({summary: 'Создание альбома'})
    @ApiResponse({status: 200, type: CreateAlbumDto})
    @Roles("MUSICIAN")
    @UseGuards(RolesGuard)
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    createPlaylist(@Body() dto: CreateAlbumDto,
                   @UploadedFile() image) {
        return this.albumService.create(dto, image)
    }
}
