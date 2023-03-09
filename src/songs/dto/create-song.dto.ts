import {ApiProperty} from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";


export class CreateSongDto {
    @ApiProperty({example: 'Drown', description: 'Название песни'})
    @IsString({message: "Должно быть строкой"})
    readonly title: string;

    @ApiProperty({example: 3, description: 'Идентификатор принадлежности к альбому'})
    readonly albumId: number;

    @ApiProperty({example: 6, description: 'Идентификатор создателя альбома'})
    readonly musicianId: number;

    @ApiProperty({example: 'audio/file1.jpg', description: 'Путь к файлу'})
    @IsOptional()
    readonly audio: string;
}