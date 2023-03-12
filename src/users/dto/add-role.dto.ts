import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddRoleDto {
  @ApiProperty({ example: 'ADMIN', description: 'Название роли' })
  @IsString({ message: 'Должно быть строкой' })
  readonly value: string;

  @ApiProperty({
    example: '4',
    description: 'Идентификатор пользователя для выдачи ему роли',
  })
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly userId: number;
}
