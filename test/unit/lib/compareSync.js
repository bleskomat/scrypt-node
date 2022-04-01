const assert = require('assert');
const { compareSync } = require('../../../');

describe('compareSync(secret, hash)', function() {

	it('returns TRUE when secret matches the hash', function() {
		const secret = 'test';
		const hash = '$scrypt$1$4$NLr8AfQ5NzFq/K+k6Kw7BBNIHRE=$Ige4IdNQMr+heaKjw74AqiQbEaJjQ88BKZJNba+xias=';
		const result = compareSync(secret, hash);
		assert.strictEqual(result, true);
	});

	it('returns FALSE when secret does not match the hash', function() {
		const secret = 'does-not-match';
		const hash = '$scrypt$1$4$NLr8AfQ5NzFq/K+k6Kw7BBNIHRE=$Ige4IdNQMr+heaKjw74AqiQbEaJjQ88BKZJNba+xias=';
		const result = compareSync(secret, hash);
		assert.strictEqual(result, false);
	});
});
