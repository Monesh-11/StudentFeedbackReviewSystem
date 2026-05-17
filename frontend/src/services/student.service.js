import api from './api';

const getProfile = async () => {
    const response = await api.get('/student/profile');
    return response.data;
};

const updateProfile = async (profileData) => {
    const response = await api.put('/student/profile', profileData);
    return response.data;
};

const addSkill = async (skillData) => {
    const response = await api.post('/student/skills', skillData);
    return response.data;
};

const getDashboard = async () => {
    const response = await api.get('/student/dashboard');
    return response.data;
};

const getTests = async () => {
    const response = await api.get('/student/test');
    return response.data;
};

const getTest = async (testId) => {
    const response = await api.get(`/student/test/${testId}`);
    return response.data;
};

const submitTest = async (testId, answers, startTime) => {
    const response = await api.post(`/student/test/${testId}/submit?startTime=${startTime}`, { answers });
    return response.data;
};

const getTestResult = async (testId) => {
    const response = await api.get(`/student/test/${testId}/result`);
    return response.data;
};

const getRoadmaps = async () => {
    const response = await api.get('/student/roadmaps');
    return response.data;
};

const getRoadmap = async (roadmapId) => {
    const response = await api.get(`/student/roadmap/${roadmapId}`);
    return response.data;
};

const markTopicComplete = async (topicId) => {
    const response = await api.post(`/student/roadmap/topic/${topicId}/complete`);
    return response.data;
};

const getBadges = async () => {
    const response = await api.get('/student/badges');
    return response.data;
};

const submitFeedback = async (feedbackData) => {
    const response = await api.post('/feedback/submit', feedbackData);
    return response.data;
};

const studentService = {
    getProfile,
    updateProfile,
    addSkill,
    getDashboard,
    getTests,
    getTest,
    submitTest,
    getTestResult,
    getRoadmaps,
    getRoadmap,
    markTopicComplete,
    getBadges,
    submitFeedback
};

export default studentService;
