import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

const start = async () => {
  try {
    const PORT = process.env.PORT || 3333;

    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');

    app.enableCors({
      origin: '*',
      methods: 'GET,PUT,POST,DELETE',
      allowedHeaders: 'Content-Type, Authorization',
      credentials: true,
      optionsSuccessStatus: 200,
    });

    const config = new DocumentBuilder()
      .setTitle('Furniro')
      .setDescription('A real(test) project like eCommerce')
      .setVersion('1.0.0')
      .addTag('NestJS, Postgres, Sequelize')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);

    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
