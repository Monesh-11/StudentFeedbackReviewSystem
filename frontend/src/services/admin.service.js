import api from './api';

const getFeedback = async () => {
    const response = await api.get('/feedback/admin');
    return response.data;
};

const getFeedbackByStatus = async (status) => {
    const response = await api.get(`/feedback/admin/status/${status}`);
    return response.data;
};

const updateFeedbackStatus = async (feedbackId, status) => {
    const response = await api.put(`/feedback/admin/${feedbackId}/status?status=${status}`);
    return response.data;
};

// Assuming AdminController will have user management
const getAllUsers = async () => {
    const response = await api.get('/admin/users');
    return response.data;
};

const adminService = {
    getFeedback,
    getFeedbackByStatus,
    updateFeedbackStatus,
    getAllUsers
};

export default adminService;
