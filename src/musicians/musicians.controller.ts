import {
  Body,
  Controller,
  Get,
  Optional,
  Param,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MusiciansService } from './musicians.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateMusicianDto } from './dto/create-musician.dto';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Musician } from './musicians.model';

@ApiTags('Исполнители')
@Controller('musicians')
export class MusiciansController {
  constructor(private musicianService: MusiciansService) {}

  @ApiOperation({ summary: 'Получение всех музыкантов' })
  @ApiResponse({ status: 200, type: [Musician] })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  getAll(): Promise<Musician[]> {
    return this.musicianService.getAllMusicians();
  }

  @ApiOperation({ summary: 'Получение музыканта по id' })
  @ApiResponse({ status: 200, type: Musician })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get('/:value')
  getOne(@Param('value') value: number): Promise<Musician> {
    return this.musicianService.getOneMusicianById(value);
  }

  @ApiOperation({ summary: 'Создание профиля исполнителя' })
  @ApiResponse({ status: 200, type: Musician })
  @Roles('MUSICIAN')
  @UseGuards(RolesGuard)
  @Post('/registration')
  @UseInterceptors(FileInterceptor('image'))
  createMusician(
    @Body() dto: CreateMusicianDto,
    @UploadedFile() @Optional() image,
    @Req() request,
  ): Promise<Musician> {
    return this.musicianService.create(dto, image, request.user.id);
  }

  @ApiOperation({ summary: 'Поиск исполнителей по имени' })
  @ApiResponse({ status: 200, type: [Musician] })
  @Roles('USER')
  @UseGuards(RolesGuard)
  @Get('/search/name')
  search(@Query('name') name: string): Promise<Musician[]> {
    return this.musicianService.searchByName(name);
  }
}
