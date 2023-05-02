import { Controller, Post, UseGuards} from '@nestjs/common';
import {UserId} from "../guards/user.decorator";
import {JwtAuthGuard} from "../guards/jwt.guard";

@Controller('user')
export class UserController {
  constructor() {}

  @UseGuards(JwtAuthGuard)
  @Post('info')
  async info(@UserId() userId: string) {
  }
}
