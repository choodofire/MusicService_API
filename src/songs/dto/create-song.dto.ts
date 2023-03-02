import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";


export class CreateSongDto {
    @ApiProperty({example: 'Drown', description: 'Название песни'})
    @IsString({message: "Должно быть строкой"})
    readonly title: string;

    @ApiProperty({example: 3, description: 'Идентификатор принадлежности к альбому'})
    readonly playlistId: number;

    @ApiProperty({example: 6, description: 'Идентификатор создателя альбома'})
    readonly musicianId: number;
}