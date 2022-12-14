import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.dir(exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException ? exception.getStatus() : 400;

    return response.status(status).json({
      error: exception.name,
      message:
        exception instanceof HttpException
          ? exception.getResponse()['message']
          : exception,
      createBy: 'phan van hieu',
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
