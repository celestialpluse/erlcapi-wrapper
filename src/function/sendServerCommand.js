const apiClient = require('../utils/request');
const { ERROR_MESSAGES } = require('../constants');
const { getConfig } = require('../config');
const { isValidServerKey, isValidOptions } = require("../utils/security");
const { isCooldown } = require('../utils/cooldown');


const sendServerCommand = async (serverKey, options = {}) => {

    isValidServerKey(serverKey);
    isValidOptions(options);
    if (!isCooldown('sendServerCommand')) {
        console.log('[ERLC API Wrapper: sendServerCommand()] Wait for cooldown seconds to request again');
        return;
    }
    if (!serverKey) {
        throw new Error(ERROR_MESSAGES.MISSING_SERVER_KEY);
    }

    if (!options.command) {
        throw new Error(ERROR_MESSAGES.MISSING_COMMAND);
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

    const body = {
        command: options.command
    };

    try {
        const response = await apiClient.post(`/server/command`, body, {
            headers: headers
        });

        switch (response.status) {
            case 200:
                return 'Success';
            case 400:
                return 'Bad Request';
            case 403:
                return 'Unauthorized';
            case 422:
                return 'The private server has no players in it';
            case 500:
                return 'Problem communicating with roblox.'
            default:
                return `Unexpected status code: ${response.status}`;
        }
    } catch (error) {
        throw new Error(`Failed to send server command: ${error.message}`);
    }
};

module.exports = sendServerCommand;
