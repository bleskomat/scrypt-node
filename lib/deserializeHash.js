const assert = require('assert');

module.exports = function(hash) {
	assert.ok(hash, 'Missing required argument: "hash"');
	assert.strictEqual(typeof hash, 'string', 'Invalid argument ("hash"): String expected');
	const prefix = '$scrypt$';
	assert.strictEqual(hash.substr(0, prefix.length), prefix, 'Unrecognized hash serialization format');
	const parts = hash.substr(prefix.length).split('$');
	const formatVersion = parts[0];
	let cost, derivedKey, salt;
	switch (formatVersion) {
		case '1':
			const costExponent = parseInt(parts[1]);
			assert.ok(Number.isInteger(costExponent), 'Invalid hash: Cost exponent must be an integer');
			assert.ok(costExponent < 128, 'Invalid hash: Cost exponent must be less than 128');
			assert.ok(costExponent > 1, 'Invalid hash: Cost exponent must be greater than 1');
			cost = Math.pow(2, costExponent);
			salt = Buffer.from(parts[2], 'base64');
			derivedKey = Buffer.from(parts[3], 'base64');
			break;
		default:
			throw new Error(`Unknown format version: "${formatVersion}"`);
	}
	const keylen = derivedKey.byteLength;
	return { cost, derivedKey, keylen, salt };
};
