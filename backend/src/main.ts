/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:1977',
    methods: 'GET,POST,HEAD,PATCH,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept',
    credentials: true,
  });
  await app.listen(3000);
  console.log(`Server running on http://localhost:3000`);
}
bootstrap();
