const createHash = require('./createHash');
const deserializeHash = require('./deserializeHash')
const normalizeHash = require('./normalizeHash');

module.exports = function(secret, hash) {
	return Promise.resolve().then(() => {
		const { cost, keylen, salt } = deserializeHash(hash);
		const options = { cost };
		return createHash(secret, salt, keylen, options).then(result => {
			return result === normalizeHash(hash);
		});
	});
};
