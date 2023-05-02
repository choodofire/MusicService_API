import {IsEmail, IsOptional, IsString, Length} from "class-validator";

export class RegisterDto {
  @IsEmail({}, { message: 'Некорректный email' })
  @IsString({ message: 'Должно быть строкой' })
  email: string;

  @IsString({ message: 'Должно быть строкой' })
  @Length(4, 16, { message: 'Не меньше 4 и не больше 16' })
  password: string;

  @IsString({ message: 'Должно быть строкой' })
  @Length(2, 30, { message: 'Не меньше 2 и не больше 30' })
  username: string;

  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  @Length(2, 20, { message: 'Не меньше 2 и не больше 20' })
  displayName?: string;
}
