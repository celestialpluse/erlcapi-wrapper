require('dotenv').config();

module.exports = {
    getEnv: (key, defaultValue) => {
        return process.env[key] || defaultValue;
    }
};
