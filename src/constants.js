const BASE_URL = 'https://api.policeroleplay.community/v1';
const ERROR_MESSAGES = {
    RATE_LIMIT: '[ERLC API] Rate limited: 404',
    MISSING_SERVER_KEY: 'Server key is required.',
    INVALID_FILTER: 'Invalid filter provided.',
    MISSING_COMMAND: 'The required command is missing.'
};
const LOG_MESSAGES = {
    STARTUP: 'ERLC API is now live and ready.',
    CREATED_BY: 'ERLC API Created By: [Celestial](https://gogoal.xyz)',
    VERSION: `Version: ${require('../package.json').version}`
};

module.exports = {
    BASE_URL,
    ERROR_MESSAGES,
    LOG_MESSAGES
};
