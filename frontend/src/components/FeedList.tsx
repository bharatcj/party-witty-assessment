import React, { useState, useEffect } from 'react';
import { getFeed } from '../api';
import { FeedCard } from './FeedCard';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface Props {
    userId: string;
}

export const FeedList: React.FC<Props> = ({ userId }) => {
    const [items, setItems] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(true);

    const fetchItems = async (pageToFetch: number) => {
        try {
            const data = await getFeed(userId, pageToFetch, 4);

            if (pageToFetch === 1) {
                setItems(data.items);
            } else {
                setItems(prev => [...prev, ...data.items]);
            }

            setHasMore(data.items.length === 4);
        } catch (error) {
            toast.error('Failed to load feed items');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems(page);
    }, [page]);

    if (loading && page === 1) {
        return (
            <div className="space-y-6">
                {[1, 2, 3].map((n) => (
                    <div key={n} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 animate-pulse">
                        <div className="h-6 bg-slate-200 rounded w-1/2 mb-4"></div>
                        <div className="space-y-3">
                            <div className="h-4 bg-slate-200 rounded"></div>
                            <div className="h-4 bg-slate-200 rounded"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
                <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Loader2 className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">No posts found</h3>
                <p className="text-slate-500">Check back later for more updates matching your interests.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="space-y-6">
                {items.map((item) => (
                    <FeedCard key={item._id} item={item} userId={userId} />
                ))}
            </div>

            {hasMore && (
                <div className="pt-4 pb-8 text-center">
                    <button
                        onClick={() => {
                            setLoading(true);
                            setPage(p => p + 1);
                        }}
                        disabled={loading}
                        className="bg-white shadow-sm border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 text-slate-700 px-6 py-3 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Load More'}
                    </button>
                </div>
            )}
            {!hasMore && items.length > 0 && (
                <div className="text-center py-8 text-slate-500 font-medium">
                    You've caught up with all the latest posts!
                </div>
            )}
        </div>
    );
};
