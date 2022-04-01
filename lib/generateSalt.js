const crypto = require('crypto');

module.exports = function(numBytes) {
	numBytes = numBytes || 20;
	return crypto.randomBytes(numBytes);
};
