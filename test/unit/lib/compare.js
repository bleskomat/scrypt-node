const assert = require('assert');
const { compare } = require('../../../');

describe('compare(secret, hash)', function() {

	it('returns a promise that resolves to TRUE when secret matches the hash', function() {
		const secret = 'test';
		const hash = '$scrypt$1$4$NLr8AfQ5NzFq/K+k6Kw7BBNIHRE=$Ige4IdNQMr+heaKjw74AqiQbEaJjQ88BKZJNba+xias=';
		return compare(secret, hash).then(result => {
			assert.strictEqual(result, true);
		});
	});

	it('returns a promise that resolves to FALSE when secret does not match the hash', function() {
		const secret = 'does-not-match';
		const hash = '$scrypt$1$4$NLr8AfQ5NzFq/K+k6Kw7BBNIHRE=$Ige4IdNQMr+heaKjw74AqiQbEaJjQ88BKZJNba+xias=';
		return compare(secret, hash).then(result => {
			assert.strictEqual(result, false);
		});
	});
});
