import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,               // удаляет лишние поля
      forbidNonWhitelisted: true,   // выбрасывает ошибку, если поле не разрешено
      transform: true,              // автоматически преобразует payload в нужный тип
    }),
  );

  await app.listen(4000);
}
bootstrap();