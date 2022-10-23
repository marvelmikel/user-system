import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  try {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const path = join(__dirname, '..', 'public');
    app.useStaticAssets(path);
    // const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.use(graphqlUploadExpress({ maxFileSize: 100000000, maxFiles: 10 }));
    await app.listen(6000);
  } catch (error) {
    console.log(error);
  }
}
bootstrap();
