import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UnbanUserDto {
  @ApiProperty({
    example: 3,
    description: 'Идентификатор пользователя для разбана',
  })
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly userId: number;
}
