import {ApiProperty} from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class CreateRoleDto {

    @ApiProperty({example: 'ADMIN', description: 'Название роли'})
    @IsString({message: "Должно быть строкой"})
    @Length(4,15, {message: "Не меньше 4 и не больше 15"})
    readonly value: string;

    @ApiProperty({example: 'Администратор', description: 'Описание роли'})
    @IsString({message: "Должно быть строкой"})
    @Length(4,50, {message: "Не меньше 4 и не больше 50"})
    readonly description: string;
}