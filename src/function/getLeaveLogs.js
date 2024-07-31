const apiClient = require('../utils/request');
const { ERROR_MESSAGES } = require('../constants');
const { getConfig } = require('../config');
const { isValidServerKey, isValidOptions } = require("../utils/security");
const { isCooldown } = require('../utils/cooldown');


const getLeaveLogs = async (serverKey, options = {}) => {

    isValidServerKey(serverKey);
    isValidOptions(options);
    if (!isCooldown('getLeaveLogs')) {
        console.log('[ERLC API Wrapper: getLeaveLogs()] Wait for cooldown seconds to request again');
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
        const response = await apiClient.get(`/server/joinlogs`, {
            headers: headers,
            params: options.filter ? { filter: options.filter.join(',') } : {}
        });

        const leaveLogs = response.data.filter(log => log.Join === false);
        return leaveLogs.length > 0 ? leaveLogs : null;
    } catch (error) {
        throw new Error(`Failed to retrieve leave logs: ${error.message}`);
    }
};

module.exports = getLeaveLogs;
