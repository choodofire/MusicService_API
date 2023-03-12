import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Album } from './albums.model';

@ApiTags('Альбомы')
@Controller('albums')
export class AlbumsController {
  constructor(private albumService: AlbumsService) {}

  @ApiOperation({ summary: 'Создание альбома' })
  @ApiResponse({ status: 200, type: Album })
  @Roles('MUSICIAN')
  @UseGuards(RolesGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createAlbum(
    @Body() dto: CreateAlbumDto,
    @UploadedFile() image,
    @Req() request,
  ): Promise<Album> {
    return this.albumService.create(dto, image, request.user.id);
  }

  @ApiOperation({ summary: 'Получение всех альбомов' })
  @ApiResponse({ status: 200, type: [Album] })
  @Roles('USER')
  @UseGuards(RolesGuard)
  @Get()
  getAllAlbums(
    @Query('count') count: number,
    @Query('offset') offset: number,
  ): Promise<Album[]> {
    return this.albumService.getAllAlbums(count, offset);
  }

  @ApiOperation({ summary: 'Удаление альбома со всеми привязанными песнями' })
  @ApiResponse({ status: 200, type: Album })
  @Roles('MUSICIAN')
  @UseGuards(RolesGuard)
  @Delete('/:value')
  @HttpCode(200)
  deleteAlbumById(
    @Param('value') value: number,
    @Req() request,
  ): Promise<Album> {
    return this.albumService.deleteAlbumById(value, request.user.id);
  }
}
