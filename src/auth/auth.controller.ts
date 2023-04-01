import {Body, Controller, Param, Post, UseGuards, UsePipes} from '@nestjs/common';
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

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiResponse({ status: 200, type: JwtTokenDto })
  @Post('/login')
  login(@Body() userDto: LoginUserDto): Promise<Object> {
    return this.authService.login(userDto);
  }

  @ApiOperation({ summary: 'Регистрация пользователя' })
  @UsePipes(ValidationPipe)
  @ApiResponse({ status: 201, type: JwtTokenDto })
  @Post('/registration')
  registration(@Body() userDto: CreateUserDto): Promise<Object> {
    return this.authService.registration(userDto);
  }

  @ApiOperation({ summary: 'Регистрация суперпользователя со всеми ролями' })
  @UsePipes(ValidationPipe)
  @ApiResponse({ status: 201, type: JwtTokenDto })
  @Post('/registration/superuser')
  registrationSuperuser(@Body() userDto: CreateUserDto): Promise<Object> {
    return this.authService.registrationSuperUser(userDto);
  }

  @ApiOperation({ summary: 'Выход из сервиса' })
  @ApiResponse({ status: 200, })
  @Roles('USER')
  @UseGuards(RolesGuard)
  @Post('/logout')
  logout() {
    return this.authService.logout();
  }

  @ApiOperation({ summary: 'Активация почты' })
  @ApiResponse({ status: 200, })
  @Post('/activate/:link')
  activate(@Param('link') link: string) {
    return this.authService.activate(link);
  }

  @ApiOperation({ summary: 'Обновление refresh токена' })
  @ApiResponse({ status: 200 })
  @Post('/refresh')
  refresh() {
    return this.authService.refresh();
  }
}
