import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug'],
  });

  // Global API prefix: /api/v1
  app.setGlobalPrefix('api/v1');

  // Enable CORS (configure origins per environment)
  app.enableCors({
    origin: [
      process.env['NEXT_PUBLIC_APP_URL'] ?? 'http://localhost:3000',
      process.env['NEXT_PUBLIC_ADMIN_URL'] ?? 'http://localhost:3001',
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  // Global validation pipe (validates all DTOs automatically)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,         // Strip unknown properties
      forbidNonWhitelisted: true, // Throw on unknown properties
      transform: true,         // Auto-transform payloads to DTO types
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );

  const port = process.env['PORT'] ?? 3333;
  await app.listen(port);

  logger.log(`🚀 API is running on: http://localhost:${port}/api/v1`);
  logger.log(`📚 Environment: ${process.env['NODE_ENV'] ?? 'development'}`);
}

bootstrap();

