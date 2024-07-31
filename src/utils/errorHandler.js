const chalk = require('chalk');
const axios = require('axios');
const { getConfig } = require('../config');
const config = getConfig();

module.exports.handleError = async (message, error) => {
    if (config.errorType === 'Console') {
        console.error(chalk.red(message));
    } else if (config.errorType === 'Message' && config.errorWebhook) {
        try {
            await axios.post(config.errorWebhook, { content: message });
        } catch (webhookError) {
            console.error(chalk.red(`[ERLC Package] Webhook not found or failed: ${webhookError.message}`));
        }
    }
};
