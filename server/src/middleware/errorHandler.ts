import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error('[error]', err);
  const status = (err as any).status ?? (err as any).statusCode ?? 500;
  res.status(status).json({
    success: false,
    error: {
      code: (err as any).code ?? 'INTERNAL_ERROR',
      message: process.env.NODE_ENV === 'production'
        ? 'Something went wrong.'
        : (err.message ?? 'Unknown error')
    }
  });
};
