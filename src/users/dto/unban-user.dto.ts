import {ApiProperty} from "@nestjs/swagger";

export class UnbanUserDto {
    @ApiProperty({example: 3, description: 'Идентификатор пользователя для разбана'})
    readonly userId: number;
}