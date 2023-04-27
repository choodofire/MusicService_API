import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GenerateTokensPayloadDto } from './dto/generate-tokens-payload.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Token } from './tokens.model';
import { User } from '../users/users.model';
import { CreateRefreshTokenReqDto } from './dto/create-refresh-token-req.dto';
import { GenerateTokensResponseDto } from './dto/generate-tokens-response.dto';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token) private tokenRepository: typeof Token,
    @InjectModel(User) private userRepository: typeof User,
    private jwtService: JwtService,
  ) {}

  async saveToken(tokenDto: CreateRefreshTokenReqDto): Promise<Token> {
    const save = await this.tokenRepository.create(tokenDto);
    return save;
  }

  async getTokenById(userId: number): Promise<string> {
    const tokens = await this.tokenRepository.findOne({
      where: {
        userId,
      },
    });
    if (!tokens)
      throw new HttpException(
        'Токены доступа не найдены',
        HttpStatus.NOT_FOUND,
      );
    return tokens.refreshToken;
  }

  async removeToken(refreshToken: string): Promise<string> {
    const tokens = await this.tokenRepository.findOne({
      where: {
        refreshToken,
      },
    });
    if (!tokens)
      throw new HttpException(
        'Токены доступа не найдены',
        HttpStatus.NOT_FOUND,
      );
    await tokens.destroy();
    return tokens.refreshToken;
  }

  async generateToken(
    user: GenerateTokensPayloadDto,
  ): Promise<GenerateTokensResponseDto> {
    const payload = {
      id: user.id,
      email: user.email,
      roles: user.roles,
      isActivated: user.isActivated,
    };
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

  async findToken(refreshToken) {
    const tokenData = await this.tokenRepository.findOne({
      where: { refreshToken },
    });
    return tokenData;
  }
}
