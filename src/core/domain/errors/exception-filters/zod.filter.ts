
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { ZodError } from 'zod';

@Catch(ZodError)
export class ZodFilter<T extends ZodError> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = HttpStatus.BAD_REQUEST;

    response
      .status(status)
      .json({
        error: "validate",
        message: exception.errors.map((err) => ({
          id: err.path[0],
          errorMessage: err.message
        })),
        statusCode: status,
      });
  }
}
