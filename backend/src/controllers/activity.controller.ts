import { Request, Response, NextFunction } from 'express';
import { recordActivity } from '../services/activity.service';
import Joi from 'joi';
import { ActionType } from '../models/Activity';

const activitySchema = Joi.object({
    userId: Joi.string().required(),
    feedId: Joi.string().required(),
});

export const createActivity = (actionType: ActionType) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { error, value } = activitySchema.validate(req.body);
            if (error) {
                res.status(400).json({ message: error.details[0].message });
                return;
            }

            const { userId, feedId } = value;
            const result = await recordActivity(userId, feedId, actionType);

            res.json(result);
        } catch (error) {
            next(error);
        }
    };
};
