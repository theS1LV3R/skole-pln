import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

type ExtendedError = Error & { [key: string]: any };

@Catch()
export class AllExceptionsFilter implements ExceptionFilter<Error> {
  catch(exception: ExtendedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const code =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = {
      statusCode: code,
      timestamp: new Date().toLocaleDateString(),
      path: request.url,
      method: request.method,
      message: exception.message ?? exception.details ?? null,
      details: exception.response ?? null,
    };

    response.status(code).json(errorResponse);
  }
}
