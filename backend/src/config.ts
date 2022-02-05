import { ConfigFactory } from '@nestjs/config';
import * as Joi from 'joi';

export const configFactory: ConfigFactory<configType> = (): configType => ({
  port: parseInt(process.env.PORT) ?? 3001,
  listen_addr: process.env.LISTEN_ADDR ?? 'localhost',
  database: {
    type: (process.env.TYPEORM_CONNECTION as validDbType) ?? 'postgres',
    host: process.env.TYPEORM_HOST ?? 'localhost',
    port: parseInt(process.env.TYPEORM_PORT, 10) ?? 5432,

    username: process.env.TYPEORM_USERNAME ?? 'postgres',
    password: process.env.TYPEORM_PASSWORD ?? 'postgres',
    db: process.env.TYPEORM_DATABASE ?? 'pln',
  },
  jwt: {
    secret: process.env.JWT_SECRET ?? '',
    duration: process.env.JWT_DURATION ?? '1d',
  },
  refresh_token: {
    duration: [parseInt(process.env.REFRESH_TOKEN_DURATION) ?? 30, 'd'],
    secret: process.env.REFRESH_TOKEN_SECRET ?? '',
  },
  cookie_secret: process.env.COOKIE_SECRET ?? '',
});

export type validDbType = 'postgres' | 'mysql';

export type configType = {
  port: number;
  listen_addr: string;
  database: {
    type: validDbType;
    host: string;
    port: number;
    username: string;
    password: string;
    db: string;
  };
  jwt: {
    secret: string;
    duration: string;
  };
  refresh_token: {
    duration: [number, string];
    secret: string;
  };
  cookie_secret: string;
};

const HOST_REGEX =
  /^(?=.{1,255}$)[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?)*\.?$/;

export const configValidation = {
  PORT: Joi.number().default(3001),
  LISTEN_ADDR: Joi.string().regex(HOST_REGEX).default('localhost'),
  TYPEORM_CONNECTION: Joi.string()
    .valid('postgres', 'mysql')
    .default('postgres'),
  TYPEORM_HOST: Joi.string().regex(HOST_REGEX).default('localhost'),
  TYPEORM_PORT: Joi.number().min(1).max(65535).default(5432),
  TYPEORM_USERNAME: Joi.string().default('postgres'),
  TYPEORM_DATABASE: Joi.string().default('pln'),
  JWT_SECRET: Joi.string().default(''),
  JWT_DURATION: Joi.string().default('1d'),
  REFRESH_TOKEN_DURATION: Joi.string().default('30d'),
  REFRESH_TOKEN_SECRET: Joi.string().default(''),
  COOKIE_SECRET: Joi.string().default(''),
};
