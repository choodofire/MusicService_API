import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlaylistDto {
  @ApiProperty({ example: 'Для работы', description: 'Название плейлиста' })
  @IsString({ message: 'Должно быть строкой' })
  readonly title: string;

  @ApiProperty({ example: 'photo.jpg', description: 'Файл обложки' })
  @IsOptional()
  readonly image: string;
}
