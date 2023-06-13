import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ValidationPipe } from '../pipes/validation.pipe';
import { Response, Request } from 'express';
import { RegisterUserResponseDto } from './dto/register-user-response.dto';
import { LogoutUserResponseDto } from './dto/logout-user-response.dto';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiResponse({ status: 200, type: RegisterUserResponseDto })
  @Post('/login')
  async login(
    @Body() userDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<Object> {
    const tokensAndInfo = await this.authService.login(userDto);
    const jwtRefresh = tokensAndInfo.refreshToken;
    response.cookie('refreshToken', jwtRefresh, {
      httpOnly: true,
      secure: false,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return {
      ...tokensAndInfo,
    };
  }

  @ApiOperation({ summary: 'Регистрация пользователя' })
  @UsePipes(ValidationPipe)
  @ApiResponse({ status: 201, type: RegisterUserResponseDto })
  @Post('/registration')
  async registration(
    @Body() userDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<Object> {
    const tokensAndInfo = await this.authService.registration(userDto);
    const jwtRefresh = tokensAndInfo.refreshToken;
    response.cookie('refreshToken', jwtRefresh, {
      httpOnly: true,
      secure: false,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return {
      ...tokensAndInfo,
    };
  }

  @ApiOperation({ summary: 'Регистрация суперпользователя со всеми ролями' })
  @UsePipes(ValidationPipe)
  @ApiResponse({ status: 201, type: RegisterUserResponseDto })
  @Post('/registration/superuser')
  async registrationSuperuser(
    @Body() userDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<Object> {
    const tokensAndInfo = await this.authService.registrationSuperUser();
    const jwtRefresh = tokensAndInfo.refreshToken;
    response.cookie('refreshToken', jwtRefresh, {
      httpOnly: true,
      secure: false,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return {
      ...tokensAndInfo,
    };
  }

  @ApiOperation({ summary: 'Выход из сервиса' })
  @ApiResponse({ status: 200, type: LogoutUserResponseDto })
  @Post('/logout')
  logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<LogoutUserResponseDto> {
    response.clearCookie('refreshToken');
    return this.authService.logout(request);
  }

  @ApiOperation({ summary: 'Активация почты' })
  @ApiResponse({ status: 302 })
  @Get('/activate/:link')
  async activate(
    @Param('link') link: string,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    await this.authService.activate(link);
    response.redirect(process.env.FRONTEND_URL);
  }

  //todo
  @ApiOperation({ summary: 'Обновление refresh токена' })
  @ApiResponse({ status: 200 })
  @Get('/refresh')
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { refreshToken } = request.cookies;
    const tokensAndInfo = await this.authService.refresh(refreshToken);
    const jwtRefresh = tokensAndInfo.refreshToken;
    response.cookie('refreshToken', jwtRefresh, {
      httpOnly: true,
      secure: false,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return {
      ...tokensAndInfo,
    };
  }
}
