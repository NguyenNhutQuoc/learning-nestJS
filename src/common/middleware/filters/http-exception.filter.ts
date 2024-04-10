import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = GqlArgumentsHost.create(host).getContext();
    const response = ctx.res;
    const request = ctx.req;

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(httpStatus).json({
      message: exception.message,
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
