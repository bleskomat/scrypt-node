const assert = require('assert');
const crypto = require('crypto');
const serializeHash = require('./serializeHash');

module.exports = function(secret, salt, keylen, options) {
	return Promise.resolve().then(() => {
		assert.ok(Buffer.isBuffer(secret) || typeof secret === 'string', 'Invalid argument ("secret"): String or Buffer expected');
		assert.ok(Buffer.isBuffer(salt) || typeof salt === 'string', 'Invalid argument ("salt"): String or Buffer expected');
		keylen = keylen || 32;
		assert.ok(Number.isInteger(keylen), 'Invalid argument ("keylen"): Integer expected');
		assert.ok(!options || typeof options === 'object', 'Invalid argument ("options"): Object expected');
		options = Object.assign({}, {
			cost: 16384,// 2^14
		}, options || {});
		const { cost } = options;
		return new Promise((resolve, reject) => {
			// https://nodejs.org/docs/latest-v12.x/api/crypto.html#crypto_crypto_scrypt_password_salt_keylen_options_callback
			crypto.scrypt(secret, salt, keylen, options, (error, derivedKey) => {
				if (error) return reject(error);
				let hash;
				try { hash = serializeHash(cost, salt, derivedKey); } catch (error) {
					return reject(error);
				}
				resolve(hash);
			});
		});
	});
};
