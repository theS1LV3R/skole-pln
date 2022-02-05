import { Logger, VersioningType, ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { configType } from './config';

const logger = new Logger('bootstrap');

const corsConfig: CorsOptions = {
  origin: /.*/,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
};

const swaggerConf = new DocumentBuilder()
  .setTitle('PLN')
  .addBearerAuth()
  .build();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['debug', 'verbose'],
  });

  const config = app.get<ConfigService<configType, true>>(ConfigService);

  const COOKIE_SECRET = config.get('cookie_secret', { infer: true });

  app.setGlobalPrefix('api', { exclude: ['docs', 'admin', 'events'] });
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.use(helmet());
  app.enableCors(corsConfig);
  app.use(compression());
  app.set('trust proxy');
  app.use(cookieParser(COOKIE_SECRET));

  const document = SwaggerModule.createDocument(app, swaggerConf);
  SwaggerModule.setup('docs', app, document);

  const PORT = config.get<PropType<configType, 'port'>>('port');
  const LISTEN_ADDR = config.get('listen_addr', { infer: true });

  await app
    .listen(PORT, LISTEN_ADDR)
    .then(async () => {
      logger.log(`Server running on ${await app.getUrl()}`);
    })
    .catch((err) => console.error(err));
}

bootstrap();
