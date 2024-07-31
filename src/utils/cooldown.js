const { getConfig } = require('../config');

const cooldowns = new Map();

const isCooldown = (key) => {
    const config = getConfig();
    const cooldown = config.cooldown * 1000;

    if (!cooldowns.has(key)) {
        cooldowns.set(key, Date.now());
        return true;
    }

    const lastRequestTime = cooldowns.get(key);
    const currentTime = Date.now();
    
    if (currentTime - lastRequestTime >= cooldown) {
        cooldowns.set(key, currentTime);
        return true;
    }

    return false;
};

module.exports = {
    isCooldown
};
