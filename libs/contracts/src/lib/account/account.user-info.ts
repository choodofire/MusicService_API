import { IsNumber } from 'class-validator';
import {IUser} from "@music_service_api/interfaces";

export namespace AccountUserInfo {
  export const topic = 'account.user-info.query';

  export class Request {
    @IsNumber({},{ message: 'Должно быть числом' })
    id: number;
  }

  export class Response {
    profile: Omit<IUser, 'passwordHash'>;
  }
}
