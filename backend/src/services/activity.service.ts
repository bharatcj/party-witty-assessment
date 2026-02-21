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
