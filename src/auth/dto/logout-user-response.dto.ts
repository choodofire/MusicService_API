import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";


export class LogoutUserResponseDto {
    @ApiProperty({ example: 'dasf213412d.das12das.21312das', description: 'refreshToken' })
    @IsString({ message: 'Должно быть строкой' })
    readonly refreshToken: string;
}