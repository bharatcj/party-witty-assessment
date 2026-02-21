import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000',
});

export const getFeed = async (userId: string, page = 1, limit = 10) => {
    const res = await api.get(`/feed/${userId}`, { params: { page, limit } });
    return res.data;
};

export const getUserScore = async (userId: string) => {
    const res = await api.get(`/user/${userId}/score`);
    return res.data;
};

export const recordActivity = async (userId: string, feedId: string, actionType: 'view' | 'like' | 'comment' | 'share') => {
    const res = await api.post(`/activity/${actionType}`, { userId, feedId });
    return res.data;
};

export default api;
