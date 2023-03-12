import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class PremiumDto {
  @ApiProperty({ example: 4, description: 'Идентификатор пользователя' })
  @IsNumber({}, { message: 'Должно быть строкой' })
  readonly userId: number;
}
