import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuration du logger pour l'ensemble de l'application
  app.useLogger(['log', 'error', 'warn', 'debug', 'verbose']);

  // Activation des autorisations CORS
  app.enableCors();

  await app.listen(3000);
  Logger.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();

// express().listen(8000);
