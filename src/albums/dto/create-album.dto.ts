import {ApiProperty} from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";


export class CreateAlbumDto {
    @ApiProperty({example: 'Sempiternal', description: 'Название альбома'})
    @IsString({message: "Должно быть строкой"})
    readonly title: string;

    @ApiProperty({example: 3, description: 'Идентификатор создателя альбома'})
    readonly musicianId: number;

    @ApiProperty({example: 'albums_avatars/file1.jpg', description: 'Путь к файлу'})
    @IsOptional()
    readonly image: string;
}