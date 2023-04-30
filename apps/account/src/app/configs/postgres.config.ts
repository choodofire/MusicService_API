import {SequelizeModuleAsyncOptions} from "@nestjs/sequelize";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {User} from "../user/models/user.model";

export const getPostgresConfig = (): SequelizeModuleAsyncOptions => {
  return {
    useFactory: (configService: ConfigService) => ({
      dialect: 'postgres',
      host: configService.get('POSTGRES_HOST'),
      port: Number(configService.get('POSTGRES_PORT')),
      username: configService.get('POSTGRES_USER'),
      password: String(configService.get('POSTGRES_PASSWORD')),
      database: configService.get('POSTGRES_DB'),
      models: [
        User
      ],
      autoLoadModels: true,
      synchronize: true,
    }),
    inject: [ConfigService],
    imports: [ConfigModule]
  }
}
