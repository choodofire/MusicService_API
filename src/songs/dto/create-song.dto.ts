import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";


export class CreateSongDto {
    @ApiProperty({example: 'Drown', description: 'Название песни'})
    @IsString({message: "Должно быть строкой"})
    readonly title: string;

    @ApiProperty({example: 'Идентификатор плейлиста', description: 'Идентификатор принадлежности к альбому'})
    readonly playlistId: number;

    @ApiProperty({example: 'Идентификатор музыканта', description: 'Идентификатор создателя альбома'})
    readonly musicianId: number;
}