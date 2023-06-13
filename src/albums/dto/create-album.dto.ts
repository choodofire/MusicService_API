import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateAlbumDto {
  @ApiProperty({ example: 'Sempiternal', description: 'Название альбома' })
  @IsString({ message: 'Должно быть строкой' })
  readonly title: string;

  @ApiProperty({ example: 'photo.jpg', description: 'Файл обложки' })
  @IsOptional()
  readonly image: string;
}
