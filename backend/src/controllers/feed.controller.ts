import { Request, Response, NextFunction } from 'express';
import { getFeedForUser } from '../services/feed.service';

export const getFeed = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.userId as string;
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 4;

        const result = await getFeedForUser(userId, page, limit);
        res.json(result);
    } catch (error) {
        next(error);
    }
};
