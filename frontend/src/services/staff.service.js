import api from './api';

const getProfile = async () => {
    // Ideally staff should also have profile endpoints, assuming same structure or we create specific ones
    // For now assuming existing user data is enough or we use generic /staff/profile
    // Since backend implementation might vary, let's assume we fetch basic user info or specific staff profile
    // Checking backend... StaffProfileResponse exists. Assuming endpoint /staff/profile exists or will exist.
    // Wait, I didn't create StaffController yet? Ah, I made StaffTestController.
    // I need to ensure StaffController has profile endpoint. I'll add that to backend tasks if missing.
    // For now, let's create the service based on expected API.
    try {
        const response = await api.get('/staff/profile');
        return response.data;
    } catch (error) {
        console.error("Error fetching staff profile", error);
        throw error;
    }
};

const createTest = async (testData) => {
    const response = await api.post('/staff/test', testData);
    return response.data;
};

const getMyTests = async () => {
    const response = await api.get('/staff/test');
    return response.data;
};

const getTest = async (testId) => {
    const response = await api.get(`/staff/test/${testId}`);
    return response.data;
};

const getTestResults = async (testId) => {
    const response = await api.get(`/staff/test/${testId}/results`);
    return response.data;
};

const getFeedback = async () => {
    const response = await api.get('/feedback/staff');
    return response.data;
};

const staffService = {
    getProfile,
    createTest,
    getMyTests,
    getTest,
    getTestResults,
    getFeedback
};

export default staffService;
