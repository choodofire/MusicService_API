import {ApiProperty} from "@nestjs/swagger";
import { IsNumber, IsString, Length } from "class-validator";

export class BanUserDto {
    @ApiProperty({example: 3, description: 'Идентификатор пользователя для бана'})
    @IsNumber({}, {message: "Должно быть числом"})
    readonly userId: number;

    @ApiProperty({example: 'Хулиганство', description: 'Причина бана'})
    @IsString({message: "Должно быть строкой"})
    @Length(3,40, {message: "Не меньше 3 и не больше 40"})
    readonly banReason: string;
}