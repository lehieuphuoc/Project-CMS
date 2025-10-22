import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,            // Loại bỏ các thuộc tính không được định nghĩa trong DTO
   
  }));

  app.setGlobalPrefix('api', { exclude: [''] });

  await app.listen(process.env.PORT ?? port);
}
bootstrap();
