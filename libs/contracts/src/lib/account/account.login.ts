import {IsEmail, IsString, Length} from 'class-validator';

export namespace AccountLogin {
  export const topic = 'account.login.command';

  export class Request {
    @IsEmail({}, { message: 'Некорректный email' })
    @IsString({ message: 'Должно быть строкой' })
    email: string;

    @IsString({ message: 'Должно быть строкой' })
    @Length(4, 16, { message: 'Не меньше 4 и не больше 16' })
    password: string;
  }

  export class Response {
    access_token: string;
    refresh_token: string;
  }
}

