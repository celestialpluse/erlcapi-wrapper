const apiClient = require('../utils/request');
const { ERROR_MESSAGES } = require('../constants');
const { getConfig } = require('../config');
const { isValidServerKey, isValidOptions } = require("../utils/security");
const { isCooldown } = require('../utils/cooldown');



const getCommandLogs = async (serverKey, options = {}) => {

    isValidServerKey(serverKey);
    isValidOptions(options);
    if (!isCooldown('getCommandLogs')) {
        console.log('[ERLC API Wrapper: getCommandLogs()] Wait for cooldown seconds to request again');
        return;
    }

    if (!serverKey) {
        throw new Error(ERROR_MESSAGES.MISSING_SERVER_KEY);
    }

    const config = getConfig();
    if (!config) {
        console.log("Need configuration. to do refer docs");
        return;
    }

    const headers = {
        'Server-Key': serverKey
    };

    if (config.globalKey) {
        headers['Authorization'] = config.globalKey;
    }

    try {
        const response = await apiClient.get(`/server/commandlogs`, {
            headers: headers,
            params: options.filter ? { filter: options.filter.join(',') } : {}
        });

        return response.data.length > 0 ? response.data : null;
    } catch (error) {
        throw new Error(`Failed to retrieve command logs: ${error.message}`);
    }
};

module.exports = getCommandLogs;
