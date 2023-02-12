import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { NotFoundExceptionFilter } from './util/util.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });

  app.useStaticAssets(join(__dirname, '..', ''));

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('NestJS Social API')
    .setDescription('The Social API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableCors({
    origin: '*',
    // credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.useGlobalFilters(new NotFoundExceptionFilter());

  await app.listen(3009);

  console.log(`Application running on port: ${await app.getUrl()}`);
}
bootstrap();
