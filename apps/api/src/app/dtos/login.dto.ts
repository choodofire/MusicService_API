import {IsEmail, IsString, Length} from "class-validator";

export class LoginDto {
  @IsEmail({}, { message: 'Некорректный email' })
  @IsString({ message: 'Должно быть строкой' })
  email: string;

  @IsString({ message: 'Должно быть строкой' })
  @Length(4, 16, { message: 'Не меньше 4 и не больше 16' })
  password: string;
}
