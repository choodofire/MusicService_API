import { IsNumber }  from 'class-validator';
import { IUserPlaylists} from "@music_service_api/interfaces";

export namespace AccountUserPlaylists {
  export const topic = 'account.user-playlists.query';

  export class Request {
    @IsNumber({},{ message: 'Должно быть числом' })
    id: number;
  }

  export class Response {
    playlists: IUserPlaylists[]
  }
}
