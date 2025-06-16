import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggingService } from './logger/logging.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(LoggingService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  process.on('uncaughtException', (err) => {
    logger.error('Uncaught Exception', err.stack);
  });

  process.on('unhandledRejection', (reason: any) => {
    logger.error('Unhandled Rejection', reason?.stack || String(reason));
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 4000;

  await app.listen(port);
}
bootstrap();
