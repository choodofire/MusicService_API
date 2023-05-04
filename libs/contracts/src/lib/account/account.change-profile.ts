import {IsNumber, IsString} from 'class-validator';
import {IUser} from "@music_service_api/interfaces";

export namespace AccountChangeProfile {
  export const topic = 'account.change-profile.command';

  export class Request {
    @IsNumber()
    id: number;

    @IsString()
    user: Pick<IUser, 'displayName'>;
  }

  export class Response {}
}
