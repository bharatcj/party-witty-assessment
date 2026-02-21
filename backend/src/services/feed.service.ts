import { FeedItem } from '../models/FeedItem';
import { User } from '../models/User';
import { Activity } from '../models/Activity';

export const getFeedForUser = async (userId: string, page: number, limit: number) => {
    const user = await User.findOne({ userId });
    if (!user) throw new Error('User not found');

    const skip = (page - 1) * limit;

    const query = {
        category: { $in: user.interests },
    };

    const [items, total, userLikes] = await Promise.all([
        FeedItem.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
        FeedItem.countDocuments(query),
        Activity.find({ userId, actionType: 'like' }).select('feedId').lean()
    ]);

    const likedFeedIds = new Set(userLikes.map(like => like.feedId));

    const itemsWithLikes = items.map(item => ({
        ...item,
        isLiked: likedFeedIds.has(item._id.toString())
    }));

    return { items: itemsWithLikes, total, page, limit };
};
