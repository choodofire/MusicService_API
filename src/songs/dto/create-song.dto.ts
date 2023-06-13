import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length } from 'class-validator';

export class CreateSongDto {
  @ApiProperty({ example: 'Drown', description: 'Название песни' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(1, 100, { message: 'Не меньше 1 и не больше 100' })
  readonly title: string;

  @ApiProperty({
    example: 3,
    description: 'Идентификатор принадлежности к альбому',
  })
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly albumId: number;

  @ApiProperty({ example: 6, description: 'Идентификатор создателя альбома' })
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly musicianId: number;
}
