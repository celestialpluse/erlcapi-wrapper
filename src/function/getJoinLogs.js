const apiClient = require('../utils/request');
const { ERROR_MESSAGES } = require('../constants');
const { getConfig } = require('../config');
const { isValidServerKey, isValidOptions } = require("../utils/security");
const { isCooldown } = require('../utils/cooldown');


const getJoinLogs = async (serverKey, options = {}) => {

    isValidServerKey(serverKey);
    isValidOptions(options);
    if (!isCooldown('getJoinLogs')) {
        console.log('[ERLC API Wrapper: getJoinLogs()] Wait for cooldown seconds to request again');
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

        const joinLogs = response.data.filter(log => log.Join === true);
        return joinLogs.length > 0 ? joinLogs : null;
    } catch (error) {
        throw new Error(`Failed to retrieve join logs: ${error.message}`);
    }
};

module.exports = getJoinLogs;
