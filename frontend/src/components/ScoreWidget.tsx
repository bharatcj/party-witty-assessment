import React from 'react';
import { useScore } from '../context/ScoreContext';
import { Activity, Eye, Heart, MessageCircle, Share2, TrendingUp, Trash2 } from 'lucide-react';
import { clearUserActivity } from '../api';
import toast from 'react-hot-toast';

export const ScoreWidget: React.FC = () => {
    const { score } = useScore();

    if (!score) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 w-full animate-pulse">
                <div className="h-6 bg-slate-200 rounded w-1/2 mb-4"></div>
                <div className="h-10 bg-slate-200 rounded w-1/3 mb-6"></div>
                <div className="space-y-4">
                    <div className="h-4 bg-slate-200 rounded"></div>
                    <div className="h-4 bg-slate-200 rounded"></div>
                    <div className="h-4 bg-slate-200 rounded"></div>
                </div>
            </div>
        );
    }

    const { totalScore, breakdown } = score;

    const statItems = [
        { label: 'Views', count: breakdown.view, icon: <Eye className="w-4 h-4 text-blue-500" /> },
        { label: 'Likes', count: breakdown.like, icon: <Heart className="w-4 h-4 text-red-500" /> },
        { label: 'Comments', count: breakdown.comment, icon: <MessageCircle className="w-4 h-4 text-slate-500" /> },
        { label: 'Shares', count: breakdown.share, icon: <Share2 className="w-4 h-4 text-green-500" /> },
    ];

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-6">
            <div className="flex items-center gap-2 mb-6 text-slate-800">
                <Activity className="w-6 h-6 text-indigo-500" />
                <h2 className="text-xl font-bold">Your Engagement</h2>
            </div>

            <div className="bg-indigo-50 rounded-xl p-5 mb-6 flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-indigo-600 uppercase tracking-wider mb-1">Total Score</p>
                    <div className="text-4xl font-black text-indigo-900">{totalScore}</div>
                </div>
                <TrendingUp className="w-10 h-10 text-indigo-300" />
            </div>

            <div className="space-y-4 mb-6">
                <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-widest pl-1">Breakdown</h4>
                <div className="space-y-3">
                    {statItems.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white shadow-sm border border-slate-100 rounded-lg">
                                    {item.icon}
                                </div>
                                <span className="font-medium text-slate-700">{item.label}</span>
                            </div>
                            <span className="font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-full text-sm">
                                {item.count}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <button
                onClick={async () => {
                    try {
                        const loadingToast = toast.loading('Clearing activity...');
                        await clearUserActivity(score.userId);
                        toast.success('Activity cleared successfully', { id: loadingToast });
                        window.location.reload();
                    } catch (error) {
                        toast.error('Failed to clear activity');
                    }
                }}
                className="w-full mt-4 flex items-center justify-center gap-2 py-3 px-4 bg-red-50 text-red-600 font-semibold rounded-xl hover:bg-red-100 transition-colors border border-red-100"
            >
                <Trash2 className="w-4 h-4" />
                Clear My Activity
            </button>
        </div>
    );
};
