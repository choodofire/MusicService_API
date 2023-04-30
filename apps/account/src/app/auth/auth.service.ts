import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {RegisterDto} from "./auth.controller";
import {UserRepository} from "../user/repositories/user.repository";
import {UserEntity} from "../user/entities/user.entity";
import {UserRole} from "@music_service_api/interfaces";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register({ email, username, displayName, password }: RegisterDto) {
    const oldUser = await this.userRepository.findUserByEmail(email);
    if (oldUser) {
      throw new HttpException(
        'Такой пользователь уже зарегистрирован',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUserEntity = await new UserEntity({
      email,
      username,
      displayName: displayName || username,
      passwordHash: 'init',
      role: UserRole.User
    }).setPassword(password);

    const newUser = await this.userRepository.createUser(newUserEntity);
    return { email: newUser.email };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) throw new HttpException(
      'Неверный email или пароль',
      HttpStatus.BAD_REQUEST,
    );
    const userEntity = new UserEntity(user);
    const isCorrectPassword = await userEntity.validatePassword(password);
    if (!isCorrectPassword) throw new HttpException(
      'Неверный email или пароль',
      HttpStatus.BAD_REQUEST,
    );
    return { id: user.id }
  }

  async login(id: number) {
    return {
      access_token: await this.jwtService.signAsync({id})
    }
  }
}
