import {IsNumber} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class AddSubscriptionDto {
  @ApiProperty({example: '4', description: 'Идентификатор исполнителя'})
  @IsNumber({},{message: "Должно быть числом"})
  readonly musicianId: number;

  @ApiProperty({example: '4', description: 'Идентификатор пользователя'})
  @IsNumber({},{message: "Должно быть числом"})
  readonly userId: number;
}