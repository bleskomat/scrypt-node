module.exports = function(cost, salt, derivedKey) {
	return [
		'$scrypt$1',// prefix = algorithm + format version
		Math.log2(cost).toString(),
		salt.toString('base64'),
		derivedKey.toString('base64'),
	].join('$');
};
