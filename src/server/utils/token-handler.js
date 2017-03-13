var jsonWebToken = require('jsonwebtoken');
var CONSTANTS = require('../config/config-keys.json');
var cryptHandler = require('../utils/crypto-handler.js');

function create(email, id) {
    var accessTokenObjectGenerator = {
        id: id,
        email: email,
        date: new Date()
    };
    var refreshTokenObjectGenerator = {
        id: id,
        date: new Date()
    };
    var accessToken = jsonWebToken.sign(accessTokenObjectGenerator, CONSTANTS.TOKEN.ACCESS_GENERATOR_KEY,
        { expiresIn: CONSTANTS.TOKEN.ACCESS_EXPIRED_TIME }
    );
    var refreshToken = jsonWebToken.sign(refreshTokenObjectGenerator, CONSTANTS.TOKEN.REFRESH_GENERATOR_KEY,
        { expiresIn: CONSTANTS.TOKEN.REFRESH_EXPIRED_TIME }
    );
    var expireDate = jsonWebToken.decode(accessToken).exp * 1000;
    var accessTokenEncrypted = cryptHandler.encrypt(accessToken);
    var refreshTokenEncrypted = cryptHandler.encrypt(refreshToken);

    var tokenJson = {
        auth: {
            accessToken: accessTokenEncrypted,
            refreshToken: refreshTokenEncrypted,
            expiredDate: new Date(expireDate)
        }
    };
    
    return tokenJson;
}

module.exports = {
    create: create
};