import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class AddSongToPlaylistDto {
  @ApiProperty({ example: '7', description: 'Идентификатор плейлиста' })
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly playlistId: number;

  @ApiProperty({ example: '3', description: 'Идентификатор песни' })
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly songId: number;
}
