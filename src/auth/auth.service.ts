import {
  Body,
  HttpException,
  HttpStatus,
  Injectable,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/users.model';
import { v4 as uuidv4 } from 'uuid';
import { JwtTokenDto } from './dto/jwt-token.dto';
import {MailService} from "./mail.service";
import {InjectModel} from "@nestjs/sequelize";
import {Token} from "./tokens/tokens.model";
import {GenerateUserTokenDto} from "./dto/generate-user-token.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Token) private tokenRepository: typeof Token,
    private userService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async login(userDto: LoginUserDto): Promise<Object> {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto): Promise<Object> {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким email уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const activationLink = uuidv4();

    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
      activationLink,
    });

    await this.mailService.sendActivationMail(userDto.email, activationLink);
    const tokens = await this.generateToken(user);
    // await this.saveToken(user.id, tokens.refreshToken);
    const cookieOptions = {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    }
    return {
      ...tokens,
      user: userDto,
      cookie: ['refreshToken', tokens.refreshToken, cookieOptions]
    };
  }

  private async generateToken(user: GenerateUserTokenDto) {
    const payload = { email: user.email, id: user.id, roles: user.roles, isActivated: user.isActivated };
    return {
      accessToken: this.jwtService.sign(payload, {
        privateKey: process.env.JWT_ACCESS_SECRET,
        expiresIn: '30m',
      }),
      refreshToken: this.jwtService.sign(payload, {
        privateKey: process.env.JWT_REFRESH_SECRET,
        expiresIn: '30d',
      }),
    };
  }

  private async saveToken(userId: number, refreshToken: string): Promise<Token> {
    const tokenData = await this.tokenRepository.findOne({
      where: { userId },
    });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await this.tokenRepository.create({userId, refreshToken})
    return token;
  }

  private async validateUser(userDto: LoginUserDto): Promise<User> {
    const user = await this.userService.getUserByEmail(userDto.email);
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'Некорректный email или пароль',
    });
  }

  async registrationSuperUser(userDto: CreateUserDto): Promise<Object> {
    const candidate = await this.userService.getAllUsers(1);
    if (candidate.length) {
      throw new HttpException(
        'Первый пользователь уже зарегистрирован',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createSuperuser({
      ...userDto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  async logout() {

  }

  async activate(link) {

  }

  async refresh() {

  }
}
