import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Roles } from "../auth/roles-auth.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { PaymentService } from "./payment.service";

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @ApiOperation({summary: 'Оформление премиум подписки'})
  @ApiResponse({status: 200})
  @Roles("USER")
  @UseGuards(RolesGuard)
  @Post('/')
  placeOrder(@Body() dto: CreatePaymentDto) {
    return this.paymentService.placeOrder(dto);
  }
}
