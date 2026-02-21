import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getUserScore } from '../api';

interface ScoreBreakdown {
    view: number;
    like: number;
    comment: number;
    share: number;
}

interface ScoreData {
    userId: string;
    totalScore: number;
    breakdown: ScoreBreakdown;
}

interface ScoreContextType {
    score: ScoreData | null;
    refreshScore: () => Promise<void>;
}

const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

export const ScoreProvider = ({ userId, children }: { userId: string; children: ReactNode }) => {
    const [score, setScore] = useState<ScoreData | null>(null);

    const refreshScore = async () => {
        try {
            const data = await getUserScore(userId);
            setScore(data);
        } catch (error) {
            console.error('Failed to fetch score', error);
        }
    };

    useEffect(() => {
        refreshScore();
    }, [userId]);

    return (
        <ScoreContext.Provider value={{ score, refreshScore }}>
            {children}
        </ScoreContext.Provider>
    );
};

export const useScore = () => {
    const context = useContext(ScoreContext);
    if (!context) throw new Error('useScore must be used within ScoreProvider');
    return context;
};
