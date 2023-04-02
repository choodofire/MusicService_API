import {Body, Controller, Get, Param, Post, Redirect, Req, Res, UseGuards, UsePipes} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ValidationPipe } from '../pipes/validation.pipe';
import { User } from '../users/users.model';
import { JwtSecretRequestType } from '@nestjs/jwt';
import { JwtTokenDto } from './dto/jwt-token.dto';
import {AddRoleDto} from "../users/dto/add-role.dto";
import {Roles} from "./roles-auth.decorator";
import {RolesGuard} from "./roles.guard";
import { Response, Request } from "express";

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiResponse({ status: 200, type: JwtTokenDto })
  @Post('/login')
  async login(@Body() userDto: LoginUserDto,
        @Res({ passthrough: true }) response: Response): Promise<Object> {
    const tokensAndInfo = await this.authService.login(userDto);
    const jwtRefresh = tokensAndInfo.refreshToken;
    response.cookie('refreshToken', jwtRefresh, { httpOnly: true, secure: false, maxAge: 30 * 24 * 60 * 60 * 1000, });
    return {
      ...tokensAndInfo
    }
  }

  @ApiOperation({ summary: 'Регистрация пользователя' })
  @UsePipes(ValidationPipe)
  @ApiResponse({ status: 201, type: JwtTokenDto })
  @Post('/registration')
  async registration(
      @Body() userDto: CreateUserDto,
      @Res({ passthrough: true }) response: Response): Promise<Object> {
    const tokensAndInfo = await this.authService.registration(userDto);
    const jwtRefresh = tokensAndInfo.refreshToken;
    response.cookie('refreshToken', jwtRefresh, { httpOnly: true, secure: false, maxAge: 30 * 24 * 60 * 60 * 1000, });
    return {
      ...tokensAndInfo
    }
  }

  @ApiOperation({ summary: 'Регистрация суперпользователя со всеми ролями' })
  @UsePipes(ValidationPipe)
  @ApiResponse({ status: 201, type: JwtTokenDto })
  @Post('/registration/superuser')
  registrationSuperuser(): Promise<Object> {
    return this.authService.registrationSuperUser();
  }

  @ApiOperation({ summary: 'Выход из сервиса' })
  @ApiResponse({ status: 200, })
  @Post('/logout')
  logout(@Req() request: Request,
         @Res({ passthrough: true }) response: Response): Promise<Object> {
    response.clearCookie('refreshToken');
    return this.authService.logout(request);
  }

  @ApiOperation({ summary: 'Активация почты' })
  @ApiResponse({ status: 302 })
  @Get('/activate/:link')
  async activate(@Param('link') link: string,
           @Res({ passthrough: true }) response: Response): Promise<void> {
    await this.authService.activate(link);
    response.redirect(process.env.FRONTEND_URL)
  }

  @ApiOperation({ summary: 'Обновление refresh токена' })
  @ApiResponse({ status: 200 })
  @Get('/refresh')
  refresh() {
    return this.authService.refresh();
  }
}
