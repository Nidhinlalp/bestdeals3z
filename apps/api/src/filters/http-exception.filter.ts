import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

// =============================================================================
// GlobalHttpExceptionFilter
// =============================================================================
// Catches all HTTP exceptions and returns a consistent error response shape.
//
// Error response format:
// {
//   "success": false,
//   "statusCode": 400,
//   "message": "Validation failed",
//   "errors": [...],
//   "path": "/api/v1/products",
//   "timestamp": "2026-01-01T00:00:00.000Z"
// }
// =============================================================================

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus?.() ?? HttpStatus.INTERNAL_SERVER_ERROR;
    const exceptionResponse = exception.getResponse();

    const message =
      typeof exceptionResponse === 'object' && 'message' in exceptionResponse
        ? (exceptionResponse as Record<string, unknown>)['message']
        : exception.message;

    const errorResponse = {
      success: false,
      statusCode: status,
      message: Array.isArray(message) ? 'Validation failed' : message,
      errors: Array.isArray(message) ? message : undefined,
      path: request.url,
      timestamp: new Date().toISOString(),
    };

    if (status >= 500) {
      this.logger.error(`${request.method} ${request.url}`, exception.stack);
    }

    response.status(status).json(errorResponse);
  }
}
