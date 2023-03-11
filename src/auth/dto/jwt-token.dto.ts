import {ApiProperty} from "@nestjs/swagger";

export class JwtTokenDto {
  @ApiProperty({example: 'dajs.dsaf21.dasfads', description: 'Jwt токен'})
  readonly token: string;
}