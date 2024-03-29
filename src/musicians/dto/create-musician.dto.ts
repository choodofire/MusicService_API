import { IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMusicianDto {
  @ApiProperty({ example: 'Bad Omens', description: 'Название исполнителя' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(2, 50, { message: 'Не меньше 2 и не больше 50' })
  readonly name: string;

  @ApiProperty({ example: '1234567', description: 'Пароль' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(4, 16, { message: 'Не меньше 4 и не больше 16' })
  readonly password: string;

  @ApiProperty({ example: 'photo.jpg', description: 'Файл аватарки' })
  @IsOptional()
  readonly image: string;
}
