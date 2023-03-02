import {IsNumber} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class AddLikesDto {
  @ApiProperty({example: '4', description: 'Идентификатор песни'})
  @IsNumber({},{message: "Должно быть числом"})
  readonly songId: number;

  @ApiProperty({example: '4', description: 'Идентификатор пользователя'})
  @IsNumber({},{message: "Должно быть числом"})
  readonly userId: number;
}