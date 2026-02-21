import { Request, Response, NextFunction } from 'express';
import { getUserScore } from '../services/user.service';

export const getScore = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.userId as string;
        const result = await getUserScore(userId);
        res.json(result);
    } catch (error) {
        next(error);
    }
};
