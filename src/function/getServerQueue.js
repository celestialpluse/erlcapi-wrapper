const apiClient = require('../utils/request');
const { ERROR_MESSAGES } = require('../constants');
const { getConfig } = require('../config');
const { isValidServerKey, isValidOptions } = require("../utils/security");
const { isCooldown } = require('../utils/cooldown');


const getServerQueue = async (serverKey) => {

    isValidServerKey(serverKey);
    isValidOptions(options);
    if (!isCooldown('getServerQueue')) {
        console.log('[ERLC API Wrapper: getServerQueue()] Wait for cooldown seconds to request again');
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
        const response = await apiClient.get(`/server/queue`, {
            headers: headers
        });

        return response.data.length > 0 ? response.data : null;
    } catch (error) {
        throw new Error(`Failed to retrieve server queue: ${error.message}`);
    }
};

module.exports = getServerQueue;
