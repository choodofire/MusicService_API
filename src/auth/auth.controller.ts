import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ValidationPipe } from '../pipes/validation.pipe';
import { User } from '../users/users.model';
import { JwtSecretRequestType } from '@nestjs/jwt';
import { JwtTokenDto } from './dto/jwt-token.dto';

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
}
