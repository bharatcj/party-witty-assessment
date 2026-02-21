import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/User';
import { FeedItem } from '../models/FeedItem';
import { Activity } from '../models/Activity';

dotenv.config();

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/interest-feed');
        console.log('Connected to DB for seeding...');

        await User.deleteMany({});
        await FeedItem.deleteMany({});
        await Activity.deleteMany({});

        const user = new User({
            userId: 'U1',
            name: 'Test User',
            interests: ['music', 'tech', 'sports'],
        });
        await user.save();

        const categories = ['music', 'tech', 'sports', 'food', 'travel'];
        const items = [];

        for (let i = 1; i <= 30; i++) {
            items.push({
                title: `Detailed Post Content #${i}`,
                category: categories[i % categories.length],
                content: `This is the descriptive content for post #${i}. It contains interesting pieces about ${categories[i % categories.length]}.`,
            });
        }

        await FeedItem.insertMany(items);
        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding DB:', error);
        process.exit(1);
    }
};

seedDB();
