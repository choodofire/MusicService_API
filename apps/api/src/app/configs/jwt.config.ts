import {JwtModuleAsyncOptions} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";

export const getJWTConfig = (): JwtModuleAsyncOptions => ({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    secret: configService.get('JWT_SECRET'),
  })
})
