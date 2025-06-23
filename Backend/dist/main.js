"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const loggerLevels = ['log', 'error', 'warn'];
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: loggerLevels,
    });
    app.enableCors({
        origin: '*',
        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    });
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    const swaggerTitle = 'Sidias Join API';
    const swaggerPath = `api/doc`;
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle(swaggerTitle)
        .setDescription(`
      🚀 Status: MVP em desenvolvimento
      🔐 Autenticação via JWT (Bearer Token)
      📘 Use a rotas de login para obter seu token
      🧑‍💻 Dev: René Kemalandua
      📫 email: kemalanduar@gmail.com
    `)
        .addServer('http://localhost:3000', 'Development')
        .setVersion('0.1')
        .addBearerAuth()
        .build();
    const swaggerDocument = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup(swaggerPath, app, swaggerDocument);
    const Port = 3000;
    await app.listen(Port);
    common_1.Logger.log(`Started at http://localhost:${Port}`, 'Sidias Join');
    common_1.Logger.log(`API Doc at http://localhost:${Port}/${swaggerPath}`, 'Sidias Join');
}
bootstrap();
//# sourceMappingURL=main.js.map