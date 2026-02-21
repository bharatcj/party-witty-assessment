import { User } from '../models/User';

export const getUserScore = async (userId: string) => {
    const user = await User.findOne({ userId });
    if (!user) throw new Error('User not found');

    return {
        userId: user.userId,
        totalScore: user.totalScore,
        breakdown: user.scoreBreakdown,
    };
};
