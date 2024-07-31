const axios = require('axios');
if (!axios) {
    throw new Error('Failed to load axios');
}
const { BASE_URL, ERROR_MESSAGES } = require('../constants');
const { handleError } = require('./errorHandler');

console.log('Initializing apiClient with BASE_URL:', BASE_URL);

const apiClient = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' },
    httpsAgent: new (require('https').Agent)({ keepAlive: true })
});

if (!apiClient) {
    throw new Error('Failed to create apiClient');
}

console.log('apiClient created:', apiClient);

apiClient.interceptors.response.use(
    response => response,
    error => {
        console.error('Interceptor error:', error);
        if (error.response && error.response.status === 404) {
            handleError(ERROR_MESSAGES.RATE_LIMIT, error);
        } else if (error.code === 'ECONNABORTED') {
            handleError('Request timeout', error);
        }
        return Promise.reject(error);
    }
);

module.exports = apiClient;
