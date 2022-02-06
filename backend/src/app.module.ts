import {
  ClassSerializerInterceptor,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import {
  ConfigModule,
  ConfigModuleOptions,
  ConfigService,
} from '@nestjs/config';
import { resolve } from 'path';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { configFactory, configType, configValidation } from '@/config';
import { AuthModule } from '@/auth/auth.module';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { UsersModule } from '@/users/users.module';
import { CommentsModule } from '@/comments/comments.module';
import { PostsModule } from '@/posts/posts.module';
// import { EventsModule } from '@/events/events.module';
import { LoggerMiddleware } from '@/common/middleware/request-log.middleware';
import { RolesGuard } from '@/common/roles.guard';
import { AppService } from './app.service';
import { GlobalModule } from '@/common/global.module';
import { AllExceptionsFilter } from './common/all-exceptions.filter';
import { DisabledGuard } from './common/guards/disabled.guard';

const configConfig: ConfigModuleOptions = {
  isGlobal: true,
  load: [configFactory],
  cache: true,
  expandVariables: true,
  envFilePath:
    process.env.NODE_ENV === 'production'
      ? resolve(__dirname, '../.env')
      : resolve(__dirname, '../.env.dev'),
  ignoreEnvFile: false,
  ignoreEnvVars: false,
  validationSchema: Joi.object({
    ...configValidation,
    NODE_ENV: Joi.string()
      .valid('development', 'production', 'test')
      .default('development'),
  }),
};

@Module({
  imports: [
    ConfigModule.forRoot(configConfig),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService<configType>) => {
        const conf = config.get('database', { infer: true });
        return {
          type: conf.type,
          host: conf.host,
          port: conf.port,
          username: conf.username,
          password: conf.password,
          database: conf.db,
          entities: [resolve(__dirname, '**/**.entity{.ts,.js}')],
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
    GlobalModule,
    UsersModule,
    AuthModule,
    PostsModule,
    CommentsModule,
    // EventsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: DisabledGuard,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
