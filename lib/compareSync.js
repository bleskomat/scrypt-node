const createHashSync = require('./createHashSync');
const deserializeHash = require('./deserializeHash')
const normalizeHash = require('./normalizeHash');

module.exports = function(secret, hash) {
	const { cost, keylen, salt } = deserializeHash(hash);
	const options = { cost };
	const result = createHashSync(secret, salt, keylen, options);
	return result === normalizeHash(hash);
};
