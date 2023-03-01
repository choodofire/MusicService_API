import {ApiProperty} from "@nestjs/swagger";

export class LoginUserDto {

    @ApiProperty({example: 'user@outlook.com', description: 'Почтовый ящик'})
    readonly email: string;

    @ApiProperty({example: '1234567', description: 'Пароль'})
    readonly password: string;
}