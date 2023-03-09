import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Query,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from "@nestjs/common";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {FileInterceptor} from "@nestjs/platform-express";
import {AlbumsService} from "./albums.service";
import {CreateAlbumDto} from "./dto/create-album.dto";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import { Album } from "./albums.model";

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
        return this.albumService.create(dto, image);
    }

    @ApiOperation({summary: 'Получение всех альбомов'})
    @ApiResponse({status: 200, type: [Album]})
    @Roles("USER")
    @UseGuards(RolesGuard)
    @Get()
    getAllAlbums(@Query('count') count: number,
                 @Query('offset') offset: number) {
        return this.albumService.getAllAlbums(count, offset);
    }

    @ApiOperation({summary: 'Удаление альбома со всеми привязанными песнями'})
    @ApiResponse({status: 200, type: [Album]})
    @Roles("USER")
    @UseGuards(RolesGuard)
    @Delete('/:value')
    deleteAlbumById(@Param('value') value: number) {
        return this.albumService.deleteAlbumById(value)
    }
}
