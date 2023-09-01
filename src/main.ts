import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule, { cors: true });

  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  });

  const config = new DocumentBuilder()
    .setTitle('Music-streaming-service')
    .setDescription('Documentation of REST API for music streaming service')
    .setVersion('1.0.0')
    .addTag('Vyacheslav Gordeev')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
  });
}

start();
