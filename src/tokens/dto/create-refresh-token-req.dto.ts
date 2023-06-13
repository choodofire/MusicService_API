import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsString, Length} from "class-validator";

export class CreateRefreshTokenReqDto {
    @ApiProperty({
        example: 3,
        description: 'Идентификатор пользователя для токена',
    })
    @IsNumber({}, { message: 'Должно быть числом' })
    readonly userId: number;

    @ApiProperty({ example: 'dfsjfjds231.das123d.dasf234d', description: 'Refresh токен' })
    @IsString({ message: 'Должно быть строкой' })
    readonly refreshToken: string;
}