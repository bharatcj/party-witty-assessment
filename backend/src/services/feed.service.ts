import { FeedItem } from '../models/FeedItem';
import { User } from '../models/User';

export const getFeedForUser = async (userId: string, page: number, limit: number) => {
    const user = await User.findOne({ userId });
    if (!user) throw new Error('User not found');

    const skip = (page - 1) * limit;

    const query = {
        category: { $in: user.interests },
    };

    const [items, total] = await Promise.all([
        FeedItem.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
        FeedItem.countDocuments(query),
    ]);

    return { items, total, page, limit };
};
