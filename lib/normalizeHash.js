const deserializeHash = require('./deserializeHash');
const serializeHash = require('./serializeHash');

module.exports = function(hash) {
	const { cost, derivedKey, keylen, salt } = deserializeHash(hash);
	return serializeHash(cost, salt, derivedKey);
};
