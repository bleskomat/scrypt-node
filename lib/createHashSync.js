const assert = require('assert');
const crypto = require('crypto');
const serializeHash = require('./serializeHash');

module.exports = function(secret, salt, keylen, options) {
	assert.ok(Buffer.isBuffer(secret) || typeof secret === 'string', 'Invalid argument ("secret"): String or Buffer expected');
	assert.ok(Buffer.isBuffer(salt) || typeof salt === 'string', 'Invalid argument ("salt"): String or Buffer expected');
	keylen = keylen || 32;
	assert.ok(Number.isInteger(keylen), 'Invalid argument ("keylen"): Integer expected');
	assert.ok(!options || typeof options === 'object', 'Invalid argument ("options"): Object expected');
	options = Object.assign({}, {
		cost: 16384,// 2^14
	}, options || {});
	// https://nodejs.org/dist/latest-v12.x/docs/api/crypto.html#crypto_crypto_scryptsync_password_salt_keylen_options
	const derivedKey =  crypto.scryptSync(secret, salt, keylen, options);
	const { cost } = options;
	const hash = serializeHash(cost, salt, derivedKey);
	return hash;
};
