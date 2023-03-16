import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SongsService } from './songs.service';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateSongDto } from './dto/create-song.dto';
import { Song } from './songs.model';
import { Musician } from "../musicians/musicians.model";

@ApiTags('Песни')
@Controller('songs')
export class SongsController {
  constructor(private songService: SongsService) {}

  @ApiOperation({ summary: 'Создание песни' })
  @ApiResponse({ status: 200, type: Song })
  @Roles('MUSICIAN')
  @UseGuards(RolesGuard)
  @Post()
  @UseInterceptors(FileInterceptor('audio'))
  createSong(@Body() dto: CreateSongDto, @UploadedFile() audio): Promise<Song> {
    return this.songService.create(dto, audio);
  }

  @ApiOperation({ summary: 'Прослушивание песни' })
  @ApiResponse({ status: 204 })
  @Roles('USER')
  @UseGuards(RolesGuard)
  @Post('/listen/:id')
  @HttpCode(204)
  listen(@Param('id') id: number): Promise<void> {
    return this.songService.listen(id);
  }

  @ApiOperation({ summary: 'Получение одной песни по id ' })
  @ApiResponse({ status: 200, type: Song })
  @Roles('USER')
  @UseGuards(RolesGuard)
  @Post('/:id')
  getOneSong(@Param('id') id: number): Promise<Song> {
    return this.songService.getOneSong(id);
  }

  @ApiOperation({ summary: 'Поиск песен по имени' })
  @ApiResponse({ status: 200, type: [Song] })
  @Roles('USER')
  @UseGuards(RolesGuard)
  @Get('/search/name')
  search(@Query('name') name: string): Promise<Song[]> {
    return this.songService.searchByName(name);
  }
}
