const assert = require('assert');
const { compare, deserializeHash, generateSalt, hash } = require('../../../');

describe('hash(secret, salt[, keylen[, options]])', function() {

	it('returns a promise that resolves with the serialized hash of the given secret', function() {
		const secret = 'test';
		const salt = generateSalt();
		return hash(secret, salt).then(result => {
			assert.strictEqual(typeof result, 'string');
			const prefix = '$scrypt$';
			assert.strictEqual(result.substr(0, prefix.length), prefix);
			const deserialized = deserializeHash(result);
			assert.strictEqual(deserialized.keylen, 32);
			assert.strictEqual(deserialized.salt.toString('hex'), salt.toString('hex'));
			assert.strictEqual(deserialized.derivedKey.byteLength, 32);
			return compare(secret, result).then(compareResult => {
				assert.strictEqual(compareResult, true);
			});
		});
	});

	it('non-default keylen', function() {
		const secret = 'test';
		const salt = generateSalt();
		const keylen = 40;
		return hash(secret, salt, keylen).then(result => {
			const deserialized = deserializeHash(result);
			assert.strictEqual(deserialized.keylen, keylen);
			assert.strictEqual(deserialized.derivedKey.byteLength, keylen);
		});
	});

	it('non-default cost', function() {
		const secret = 'test';
		const salt = generateSalt();
		const keylen = 32;
		const cost = 64;
		return hash(secret, salt, keylen, { cost }).then(result => {
			assert.strictEqual(result.substr(0, '$scrypt$1$6$'.length), '$scrypt$1$6$');
			const deserialized = deserializeHash(result);
			assert.strictEqual(deserialized.cost, cost);
		});
	});
});
