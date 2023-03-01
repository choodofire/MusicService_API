import {IsNumber, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreatePlaylistDto {
    @ApiProperty({example: 'Для работы', description: 'Название плейлиста'})
    @IsString({message: "Должно быть строкой"})
    readonly title: string;

    @ApiProperty({example: 'Идентификатор пользователя', description: 'Идентификатор создателя плейлиста'})
    @IsNumber({},{message: "Должно быть числом"})
    readonly userId: number;
}