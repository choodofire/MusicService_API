import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Optional,
  Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { PlaylistsService } from './playlists.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Playlist } from './playlists.model';
import { AddSongToPlaylistDto } from './dto/add-song-to-playlist.dto';
import { Song } from '../songs/songs.model';

@ApiTags('Плейлисты')
@Controller('playlists')
export class PlaylistsController {
  constructor(private playlistService: PlaylistsService) {}

  @ApiOperation({ summary: 'Создание плейлиста' })
  @ApiResponse({ status: 200, type: Playlist })
  @Roles('USER')
  @UseGuards(RolesGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createPlaylist(
    @Body() dto: CreatePlaylistDto,
    @UploadedFile() @Optional() image,
    @Req() request,
  ): Promise<Playlist> {
    return this.playlistService.create(dto, image, request.user.id);
  }

  @ApiOperation({ summary: 'Добавление песни в плейлист' })
  @ApiResponse({ status: 200, type: Song })
  @Roles('USER')
  @UseGuards(RolesGuard)
  @Post('/adding')
  addSongToPlaylist(@Body() dto: AddSongToPlaylistDto): Promise<Song> {
    return this.playlistService.addSongToPlaylist(dto);
  }

  @ApiOperation({ summary: 'Удаление плейлиста' })
  @ApiResponse({ status: 204 })
  @Roles('USER')
  @UseGuards(RolesGuard)
  @Delete('/:value')
  @HttpCode(204)
  deletePlaylist(@Param('value') value: number, @Req() request): Promise<void> {
    return this.playlistService.delete(value, request.user.id);
  }
}
