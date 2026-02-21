import { Schema, model, Document } from 'mongoose';

export type ActionType = 'view' | 'like' | 'comment' | 'share';

export interface IActivity extends Document {
    userId: string;
    feedId: string;
    actionType: ActionType;
    timestamp: Date;
}

const activitySchema = new Schema<IActivity>({
    userId: { type: String, required: true, index: true },
    feedId: { type: String, required: true, index: true },
    actionType: { type: String, enum: ['view', 'like', 'comment', 'share'], required: true },
    timestamp: { type: Date, default: Date.now },
});

activitySchema.index({ userId: 1, feedId: 1, actionType: 1 });

export const Activity = model<IActivity>('Activity', activitySchema);
