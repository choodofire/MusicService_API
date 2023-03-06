import { IsEnum, IsNumber } from "class-validator";
import { User } from "../../users/users.model";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePaymentDto {
  @ApiProperty({example: 'Идентификатор пользователя', description: 'Идентификатор пользователя для офомрления подписки'})
  @IsNumber({},{message: "Должно быть числом"})
  readonly userId: number;
}