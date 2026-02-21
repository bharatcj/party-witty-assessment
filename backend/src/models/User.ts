import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
    userId: string;
    name: string;
    interests: string[];
    totalScore: number;
    scoreBreakdown: {
        view: number;
        like: number;
        comment: number;
        share: number;
    };
}

const userSchema = new Schema<IUser>({
    userId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    interests: { type: [String], default: [] },
    totalScore: { type: Number, default: 0 },
    scoreBreakdown: {
        view: { type: Number, default: 0 },
        like: { type: Number, default: 0 },
        comment: { type: Number, default: 0 },
        share: { type: Number, default: 0 },
    },
});

export const User = model<IUser>('User', userSchema);
