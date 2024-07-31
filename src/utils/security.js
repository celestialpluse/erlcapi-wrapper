const isValidServerKey = (serverKey) => {
    if (!serverKey || typeof serverKey !== 'string') {
        throw new Error('Invalid server key');
    }
};

const isValidOptions = (options) => {
    if (options && typeof options !== 'object') {
        throw new Error('Options must be an object');
    }
};

module.exports = {
    isValidServerKey,
    isValidOptions,
};
