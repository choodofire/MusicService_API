import {ApiProperty} from "@nestjs/swagger";

export class BanUserDto {
    @ApiProperty({example: 3, description: 'Идентификатор пользователя для бана'})
    readonly userId: number;

    @ApiProperty({example: 'Хулиганство', description: 'Причина бана'})
    readonly banReason: string;
}