import { Activity, ActionType } from '../models/Activity';
import { User } from '../models/User';
import { FeedItem } from '../models/FeedItem';

const actionScores: Record<ActionType, number> = {
    view: 1,
    like: 3,
    comment: 4,
    share: 5,
};

export const recordActivity = async (userId: string, feedId: string, actionType: ActionType) => {
    const user = await User.findOne({ userId });
    if (!user) throw new Error('User not found');

    const feedItem = await FeedItem.findById(feedId);
    if (!feedItem) throw new Error('Feed item not found');

    if (actionType === 'view') {
        const existingView = await Activity.findOne({ userId, feedId, actionType: 'view' });
        if (existingView) {
            return { message: 'View already recorded' };
        }
    }

    if (actionType === 'like') {
        const existingLike = await Activity.findOne({ userId, feedId, actionType: 'like' });
        if (existingLike) {
            return { message: 'Already liked' };
        }
    }

    const scoreToAdd = actionScores[actionType];

    const activity = new Activity({ userId, feedId, actionType });
    await activity.save();

    await User.findOneAndUpdate(
        { userId },
        {
            $inc: {
                totalScore: scoreToAdd,
                [`scoreBreakdown.${actionType}`]: 1,
            },
        }
    );

    return { message: `Activity ${actionType} recorded successfully`, scoreAdded: scoreToAdd };
};

export const removeLike = async (userId: string, feedId: string) => {
    const user = await User.findOne({ userId });
    if (!user) throw new Error('User not found');

    const feedItem = await FeedItem.findById(feedId);
    if (!feedItem) throw new Error('Feed item not found');

    const existingLike = await Activity.findOne({ userId, feedId, actionType: 'like' });
    if (!existingLike) {
        return { message: 'Not liked yet' };
    }

    await Activity.deleteOne({ _id: existingLike._id });
    const scoreToSubtract = actionScores['like'];

    await User.findOneAndUpdate(
        { userId },
        {
            $inc: {
                totalScore: -scoreToSubtract,
                [`scoreBreakdown.like`]: -1,
            },
        }
    );

    return { message: 'Post unliked successfully', scoreSubtracted: scoreToSubtract };
};

export const clearUserActivity = async (userId: string) => {
    const user = await User.findOne({ userId });
    if (!user) {
        const err = new Error('User not found');
        (err as any).status = 404;
        throw err;
    }

    await Activity.deleteMany({ userId });

    await User.findOneAndUpdate(
        { userId },
        {
            $set: {
                totalScore: 0,
                scoreBreakdown: { view: 0, like: 0, comment: 0, share: 0 }
            },
        }
    );

    return { message: 'User activity cleared successfully' };
};
