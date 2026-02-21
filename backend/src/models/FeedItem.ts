import { Schema, model, Document } from 'mongoose';

export interface IFeedItem extends Document {
    title: string;
    category: string;
    content?: string;
    createdAt: Date;
}

const feedItemSchema = new Schema<IFeedItem>({
    title: { type: String, required: true },
    category: { type: String, required: true },
    content: { type: String },
    createdAt: { type: Date, default: Date.now },
});

export const FeedItem = model<IFeedItem>('FeedItem', feedItemSchema);
