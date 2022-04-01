const assert = require('assert');
const { generateSalt } = require('../../../');

describe('generateSalt([numBytes])', function() {

	it('returns a buffer with default number of random bytes', function() {
		const salt = generateSalt();
		assert.ok(Buffer.isBuffer(salt));
		assert.strictEqual(salt.byteLength, 20);
	});

	it('generates a new salt each time', function() {
		const salt1 = generateSalt();
		const salt2 = generateSalt();
		assert.notStrictEqual(salt1.toString('hex'), salt2.toString('hex'));
	});

	it('non-default number of bytes', function() {
		const salt = generateSalt(24);
		assert.strictEqual(salt.byteLength, 24);
	});
});
