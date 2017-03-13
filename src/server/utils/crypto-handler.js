var crypto = require('crypto');
var CONSTANTS = require('../config/config-keys.json');

function encrypt(text) {
    var cipher = crypto.createCipher(CONSTANTS.ENCRYPT.ALGORITHM, CONSTANTS.ENCRYPT.PASSWORD);
    var crypted = cipher.update(text, CONSTANTS.ENCRYPT.UTF8, CONSTANTS.ENCRYPT.HEXADECIMAL);
    crypted += cipher.final(CONSTANTS.ENCRYPT.HEXADECIMAL);
    return crypted;
}

function decrypt(text) {
    var decipher = crypto.createDecipher(CONSTANTS.ENCRYPT.ALGORITHM, CONSTANTS.ENCRYPT.PASSWORD);
    var decrypted = decipher.update(text, CONSTANTS.ENCRYPT.HEXADECIMAL, CONSTANTS.ENCRYPT.UTF8);
    decrypted += decipher.final(CONSTANTS.ENCRYPT.UTF8);
    return decrypted;
}

module.exports = {
    encrypt: encrypt,
    decrypt: decrypt
};