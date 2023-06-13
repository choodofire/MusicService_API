import { ApiProperty } from '@nestjs/swagger';

export class GenerateTokensPayloadDto {
    @ApiProperty({ example: 'dajs.dsaf21.dasfads', description: 'Jwt токен' })
    readonly email: string;

    readonly id: number;

    readonly isActivated: boolean;

    readonly roles: object;
}
