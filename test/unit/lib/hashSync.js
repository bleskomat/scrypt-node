const assert = require('assert');
const { compareSync, deserializeHash, generateSalt, hashSync } = require('../../../');

describe('hashSync(secret, salt[, keylen[, options]])', function() {

	it('returns the serialized hash of the given secret', function() {
		const secret = 'test';
		const salt = generateSalt();
		const result = hashSync(secret, salt);
		assert.strictEqual(typeof result, 'string');
		const prefix = '$scrypt$';
		assert.strictEqual(result.substr(0, prefix.length), prefix);
		const deserialized = deserializeHash(result);
		assert.strictEqual(deserialized.keylen, 32);
		assert.strictEqual(deserialized.salt.toString('hex'), salt.toString('hex'));
		assert.strictEqual(deserialized.derivedKey.byteLength, 32);
		const compareResult = compareSync(secret, result);
		assert.strictEqual(compareResult, true);
	});

	it('non-default keylen', function() {
		const secret = 'test';
		const salt = generateSalt();
		const keylen = 40;
		const result = hashSync(secret, salt, keylen);
		const deserialized = deserializeHash(result);
		assert.strictEqual(deserialized.keylen, keylen);
		assert.strictEqual(deserialized.derivedKey.byteLength, keylen);
	});

	it('non-default cost', function() {
		const secret = 'test';
		const salt = generateSalt();
		const keylen = 32;
		const cost = 64;
		const result = hashSync(secret, salt, keylen, { cost });
		assert.strictEqual(result.substr(0, '$scrypt$1$6$'.length), '$scrypt$1$6$');
		const deserialized = deserializeHash(result);
		assert.strictEqual(deserialized.cost, cost);
	});
});
