const interpreter = require('./utils/interpreter');
const Joi = require('joi');

let isConfigured = false;

const configSchema = Joi.object({
    globalKey: Joi.string().allow(null),
    cooldown: Joi.number().integer().min(0).default(0),
    errorType: Joi.string().valid('Console', 'Message').default('Console'),
    errorWebhook: Joi.string().uri().allow(null)
});

let configuration = {
    globalKey: interpreter.getEnv('ERLC_GLOBAL_KEY', null),
    cooldown: interpreter.getEnv('ERLC_COOLDOWN', 0),
    errorType: interpreter.getEnv('ERLC_ERROR_TYPE', 'Console'),
    errorWebhook: interpreter.getEnv('ERLC_ERROR_WEBHOOK', null),
};

module.exports = {
    setConfig: (options) => {
        if (isConfigured) {
            throw new Error('ERLC API Wrapper is already configured. `setConfig` can only be called once.');
        }
        
        const { error, value } = configSchema.validate(options);
        if (error) throw new Error(`Invalid configuration: ${error.message}`);
        
        configuration = { ...configuration, ...value };
        isConfigured = true;
    },
    getConfig: () => configuration,
    getServerInfo: require('./getServerInfo')
};
