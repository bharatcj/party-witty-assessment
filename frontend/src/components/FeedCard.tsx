import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, X } from 'lucide-react';
import { recordActivity, removeLike } from '../api';
import { useScore } from '../context/ScoreContext';
import toast from 'react-hot-toast';

interface FeedItem {
    _id: string;
    title: string;
    category: string;
    content?: string;
    createdAt: string;
    isLiked?: boolean;
}

interface Props {
    item: FeedItem;
    userId: string;
}

const actionColors = {
    music: 'bg-purple-100 text-purple-700',
    tech: 'bg-blue-100 text-blue-700',
    sports: 'bg-orange-100 text-orange-700',
    food: 'bg-green-100 text-green-700',
    travel: 'bg-teal-100 text-teal-700',
};

export const FeedCard: React.FC<Props> = ({ item, userId }) => {
    const { refreshScore } = useScore();
    const [isLiked, setIsLiked] = useState(item.isLiked || false);
    const [hasViewed, setHasViewed] = useState(false);
    const [isActionLoading, setIsActionLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = async () => {
        setIsModalOpen(true);
        if (!hasViewed) {
            try {
                setHasViewed(true);
                await recordActivity(userId, item._id, 'view');
                refreshScore();
            } catch (error) {
                console.error('Failed to record view');
                setHasViewed(false);
            }
        }
    };

    const handleAction = async (action: 'like' | 'comment' | 'share', e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        if (isActionLoading) return;

        try {
            setIsActionLoading(true);

            if (action === 'like') {
                if (isLiked) {
                    setIsLiked(false);
                    await removeLike(userId, item._id);
                    refreshScore();
                    toast.success('Post unliked');
                    setIsActionLoading(false);
                    return;
                } else {
                    setIsLiked(true);
                }
            }

            await recordActivity(userId, item._id, action);
            refreshScore();

            if (action === 'like') toast.success('Post liked!');
            if (action === 'comment') toast.success('Comment added: "Great post!"');
            if (action === 'share') toast.success('Post shared successfully!');
        } catch (error) {
            toast.error(`Failed to ${action}`);
            if (action === 'like') setIsLiked(!isLiked);
        } finally {
            setIsActionLoading(false);
        }
    };

    const badgeColor = actionColors[item.category as keyof typeof actionColors] || 'bg-gray-100 text-gray-700';

    return (
        <>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 transition-all hover:shadow-md">
                <div className="cursor-pointer" onClick={openModal}>
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold text-slate-800">{item.title}</h3>
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider ${badgeColor}`}>
                            {item.category}
                        </span>
                    </div>

                    <p className="text-slate-600 mb-6 line-clamp-3">
                        {item.content}
                    </p>
                </div>

                <div className="flex items-center gap-6 pt-4 border-t border-slate-100">
                    <button
                        onClick={(e) => handleAction('like', e)}
                        disabled={isActionLoading}
                        className={`flex items-center gap-2 transition-colors ${isLiked ? 'text-red-500' : 'text-slate-500 hover:text-red-500'}`}
                    >
                        <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                        <span className="font-medium text-sm">Like</span>
                    </button>

                    <button
                        onClick={(e) => handleAction('comment', e)}
                        disabled={isActionLoading}
                        className="flex items-center gap-2 text-slate-500 hover:text-blue-500 transition-colors"
                    >
                        <MessageCircle className="w-5 h-5" />
                        <span className="font-medium text-sm">Comment</span>
                    </button>

                    <button
                        onClick={(e) => handleAction('share', e)}
                        disabled={isActionLoading}
                        className="flex items-center gap-2 text-slate-500 hover:text-green-500 transition-colors ml-auto"
                    >
                        <Share2 className="w-5 h-5" />
                        <span className="font-medium text-sm">Share</span>
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}>
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                        <div className="sticky top-0 bg-white border-b border-slate-100 p-4 flex justify-between items-center z-10">
                            <h2 className="text-xl font-bold text-slate-800">Post Details</h2>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                                <X className="w-5 h-5 text-slate-500" />
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <span className={`px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider ${badgeColor}`}>
                                    {item.category}
                                </span>
                            </div>
                            <h1 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h1>
                            <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                                {item.content}
                            </p>
                        </div>
                        <div className="sticky bottom-0 bg-white border-t border-slate-100 p-4 flex items-center gap-6 z-10">
                            <button
                                onClick={(e) => handleAction('like', e)}
                                disabled={isActionLoading}
                                className={`flex items-center gap-2 transition-colors ${isLiked ? 'text-red-500' : 'text-slate-500 hover:text-red-500'}`}
                            >
                                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                                <span className="font-medium text-sm">Like</span>
                            </button>

                            <button
                                onClick={(e) => handleAction('comment', e)}
                                disabled={isActionLoading}
                                className="flex items-center gap-2 text-slate-500 hover:text-blue-500 transition-colors"
                            >
                                <MessageCircle className="w-5 h-5" />
                                <span className="font-medium text-sm">Comment</span>
                            </button>

                            <button
                                onClick={(e) => handleAction('share', e)}
                                disabled={isActionLoading}
                                className="flex items-center gap-2 text-slate-500 hover:text-green-500 transition-colors ml-auto"
                            >
                                <Share2 className="w-5 h-5" />
                                <span className="font-medium text-sm">Share</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
