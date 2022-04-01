# scrypt-node

![Build Status](https://github.com/bleskomat/scrypt-node/actions/workflows/tests.yml/badge.svg)

Node.js module that provides a wrapper API to node's built-in [scrypt](https://nodejs.org/api/crypto.html#cryptoscryptpassword-salt-keylen-options-callback) implementation.

Why not just use the built-in scrypt of Node.js? You could, but it's nice to have a portable serialization format that can be stored in a database or configuration file long-term without worrying about incompatibility when changing hashing options. An example of the serialization format used by this module:
```
$scrypt$1$14$iAoNah2WdPs7s2JZTd0Velb6ycQ=$ttq2cz7NoXNkAs6Nbl+TNKZsYFaEQJFcIWNTApiV67k=
```
`$scrypt$` is the prefix and the `$` symbol is used as a delimiter. The first value is the serialization format version - in this case `1`. The second value is the cost exponent - in this case `14` meaning the cost is equal to 2^14 or 16384. The third value is the base64-encoded salt. And the fourth value is the base64-encoded derived key.

* [Installation](#installation)
* [Usage](#usage)
* [Tests](#tests)
* [Changelog](#changelog)
* [License](#license)

## Installation

Add to your application via `npm`:
```bash
npm install @bleskomat/scrypt
```


## Usage

Create a hash of a secret:
```js
const scrypt = require('@bleskomat/scrypt');
const secret = 'super secret password';
const salt = scrypt.generateSalt();
scrypt.hash(secret, salt).then(result => {
	console.log(result);
	// $scrypt$1$14$iAoNah2WdPs7s2JZTd0Velb6ycQ=$ttq2cz7NoXNkAs6Nbl+TNKZsYFaEQJFcIWNTApiV67k=
});
```
The complete function signature is `scrypt.hash(secret, salt, keylen, options)`. The `keylen` and `options` arguments are passed to [crypto.scrypt](https://nodejs.org/api/crypto.html#cryptoscryptpassword-salt-keylen-options-callback). The default value for `keylen` is 32 bytes.

And `scrypt.generateSalt(numBytes)` where `numBytes` are the number of random bytes to generate. The default value for `numBytes` is 20.

Check if a secret matches a hash:
```js
const scrypt = require('@bleskomat/scrypt');
const secret = 'super secret password';
const hash = '$scrypt$1$14$iAoNah2WdPs7s2JZTd0Velb6ycQ=$ttq2cz7NoXNkAs6Nbl+TNKZsYFaEQJFcIWNTApiV67k=';
scrypt.compare(secret, result).then(result => {
	console.log(result ? 'OK' : 'DOES NOT MATCH');
});
```

### Synchronous Usage

Synchronously create a hash:
```js
const scrypt = require('@bleskomat/scrypt');
const secret = 'super secret password';
const salt = scrypt.generateSalt();
const result = scrypt.hashSync(secret, salt);
console.log(result);
// $scrypt$1$14$iAoNah2WdPs7s2JZTd0Velb6ycQ=$ttq2cz7NoXNkAs6Nbl+TNKZsYFaEQJFcIWNTApiV67k=
```
The complete function signature is `scrypt.hashSync(secret, salt, keylen, options)`. The `keylen` and `options` arguments are passed to [crypto.scryptSync](https://nodejs.org/api/crypto.html#cryptoscryptsyncpassword-salt-keylen-options). The default value for `keylen` is 32 bytes.

And `scrypt.generateSalt(numBytes)` where `numBytes` are the number of random bytes to generate. The default value for `numBytes` is 20.

Synchronously check if a secret matches a hash:
```js
const scrypt = require('@bleskomat/scrypt');
const secret = 'super secret password';
const hash = '$scrypt$1$14$iAoNah2WdPs7s2JZTd0Velb6ycQ=$ttq2cz7NoXNkAs6Nbl+TNKZsYFaEQJFcIWNTApiV67k=';
const result = scrypt.compareSync(secret, result);
console.log(result ? 'OK' : 'DOES NOT MATCH');
```


## Tests

Run automated tests as follows:
```bash
npm test
```


## Changelog

See [CHANGELOG.md](https://github.com/bleskomat/scrypt-node/blob/master/CHANGELOG.md)


## License

This software is [MIT licensed](https://tldrlegal.com/license/mit-license):
> A short, permissive software license. Basically, you can do whatever you want as long as you include the original copyright and license notice in any copy of the software/source.  There are many variations of this license in use.
