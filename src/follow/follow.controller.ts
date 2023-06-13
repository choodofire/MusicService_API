import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { FollowService } from './follow.service';
import { FollowCreateDto } from './dto/follow-create.dto';

@ApiTags('Подписки на музыкантов, песни')
@Controller('follow')
export class FollowController {
  constructor(private followService: FollowService) {}

  @ApiOperation({ summary: 'Оформить подписку на музыканта' })
  @ApiResponse({ status: 200, type: FollowCreateDto })
  @Roles('USER')
  @UseGuards(RolesGuard)
  @Post('/subscription')
  createSubscription(
    @Body() dto: FollowCreateDto,
    @Req() request,
  ): Promise<FollowCreateDto> {
    return this.followService.createSubscription(dto, request.user.id);
  }

  @ApiOperation({ summary: 'Удалить музыканта из подписок' })
  @ApiResponse({ status: 204 })
  @Roles('USER')
  @UseGuards(RolesGuard)
  @Delete('/subscription')
  @HttpCode(204)
  removeSubscription(
    @Body() dto: FollowCreateDto,
    @Req() request,
  ): Promise<void> {
    return this.followService.removeSubscription(dto, request.user.id);
  }

  @ApiOperation({ summary: 'Добавить песню в избранное' })
  @ApiResponse({ status: 200, type: FollowCreateDto })
  @Roles('USER')
  @UseGuards(RolesGuard)
  @Post('/likes')
  createLikes(
    @Body() dto: FollowCreateDto,
    @Req() request,
  ): Promise<FollowCreateDto> {
    return this.followService.createLikes(dto, request.user.id);
  }

  @ApiOperation({ summary: 'Удалить песни из избранного' })
  @ApiResponse({ status: 204 })
  @Roles('USER')
  @UseGuards(RolesGuard)
  @Delete('/likes')
  @HttpCode(204)
  removeLikes(@Body() dto: FollowCreateDto, @Req() request): Promise<void> {
    return this.followService.removeLikes(dto, request.user.id);
  }
}
