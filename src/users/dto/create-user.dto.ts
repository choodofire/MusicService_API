import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@outlook.com', description: 'Почтовый ящик' })
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string;

  @ApiProperty({ example: 'hash(1234567)', description: 'Пароль' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(4, 16, { message: 'Не меньше 4 и не больше 16' })
  readonly password: string;

  @ApiProperty({ example: 'Shroud', description: 'Имя пользователя' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(2, 16, { message: 'Не меньше 2 и не больше 16' })
  readonly username: string;
}
