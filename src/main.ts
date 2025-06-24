import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { Logger, LogLevel, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const loggerLevels: LogLevel[] = ['log', 'error', 'warn'];

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: loggerLevels,
  });

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  });

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  // Swagger
  const swaggerTitle = 'Sidias Join API';
  const swaggerPath = `api/doc`;

  const swaggerConfig = new DocumentBuilder()
  .setTitle(swaggerTitle)
  .setDescription(`
    🚀 Status: MVP em desenvolvimento  
    🔐 Autenticação via JWT (Bearer Token)  
    📘 Use a rota de login para obter seu token  
    🧑‍💻 Dev: René Kemalandua  
    📫 Email: kemalanduar@gmail.com
  `)
  .addServer('http://localhost:3000', 'Development')
  .addServer('https://sidiasjoin-backend.onrender.com', 'Production')
  .setVersion('0.1')
  .addBearerAuth()
  .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(swaggerPath, app, swaggerDocument);

  // Server
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
  Logger.log(`Started at http://localhost:${PORT}`, 'Sidias Join');
  Logger.log(
    `API Doc at http://localhost:${PORT}/${swaggerPath}`,
    'Sidias Join',
  );
}
bootstrap();
