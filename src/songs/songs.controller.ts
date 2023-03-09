import {Body, Controller, Get, Param, Post, Query, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {SongsService} from "./songs.service";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {FileInterceptor} from "@nestjs/platform-express";
import {CreateSongDto} from "./dto/create-song.dto";

@ApiTags('Песни')
@Controller('songs')
export class SongsController {
    constructor(private songService: SongsService) {}

    @ApiOperation({summary: 'Создание песни'})
    @ApiResponse({status: 200, type: CreateSongDto})
    @Roles("MUSICIAN")
    @UseGuards(RolesGuard)
    @Post()
    @UseInterceptors(FileInterceptor('audio'))
    createSong(@Body() dto: CreateSongDto,
                   @UploadedFile() audio) {
        return this.songService.create(dto, audio)
    }


    @ApiOperation({summary: 'Прослушивание песни'})
    @Roles("USER")
    @UseGuards(RolesGuard)
    @Post('/listen/:id')
    listen(@Param('id') id: number) {
        return this.songService.listen(id);
    }

    // @Get('/search')
    // search(@Query('query') query: string) {
    //     return this.songService.search(query)
    // }

}
