import { ApiProperty } from '@nestjs/swagger';

export class GenerateUserTokenDto {
    @ApiProperty({ example: 'dajs.dsaf21.dasfads', description: 'Jwt токен' })
    readonly email: string;

    readonly id: number;

    readonly isActivated: boolean;

    readonly roles: object;
}
