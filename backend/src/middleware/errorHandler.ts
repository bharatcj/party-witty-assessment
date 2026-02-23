import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);

    let status = err.status || 500;
    if (err.message === 'User not found' || err.message === 'Feed item not found') {
        status = 404;
    }

    res.status(status).json({
        message: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};
