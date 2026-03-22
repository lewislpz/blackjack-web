import type { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

export class ApiRequestError extends Error {
  readonly code: string;
  readonly statusCode: number;

  constructor(statusCode: number, code: string, message: string) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    this.name = 'ApiRequestError';
  }
}

export const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  void _next;

  if (error instanceof ApiRequestError) {
    response.status(error.statusCode).json({
      code: error.code,
      message: error.message,
    });

    return;
  }

  if (error instanceof ZodError) {
    response.status(400).json({
      code: 'INVALID_REQUEST',
      message: 'Request payload is invalid.',
    });

    return;
  }

  response.status(500).json({
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Unexpected server error.',
  });
};
