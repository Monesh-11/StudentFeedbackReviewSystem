import api from './api';

const executeCode = async (sourceCode, languageId, stdin) => {
    const response = await api.post('/compiler/execute', {
        sourceCode,
        languageId,
        stdin
    });
    return response.data;
};

const compilerService = {
    executeCode
};

export default compilerService;
