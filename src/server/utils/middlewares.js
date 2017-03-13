var jwt = require('jsonwebtoken');
var CONSTANTS = require('../config/config-keys.json');
var ERROR_CODES = require('../utils/rest-error-codes.json');
var cryptHandler = require('../utils/crypto-handler.js');
var tokenHandler = require('../utils/token-handler.js');

function validateToken(req, res, next) {
    if (!req.header(CONSTANTS.TOKEN.AUTHORIZATION)) {
        return res.status(ERROR_CODES.FORBIDDEN.STATUS)
            .send(ERROR_CODES.FORBIDDEN.MESSAGE);
    }
    var tokenType = req.header('token-type');
    var token = req.header(CONSTANTS.TOKEN.AUTHORIZATION).split(' ')[1];
    var decryptedToken = cryptHandler.decrypt(token);
    if(tokenType === 'access') {
        try {
            jwt.verify(decryptedToken, CONSTANTS.TOKEN.ACCESS_GENERATOR_KEY);
            next();
        } catch(error) {
            if (error.name === 'JsonWebTokenError') {
                return res.status(ERROR_CODES.FORBIDDEN.STATUS)
                    .send(ERROR_CODES.FORBIDDEN.MESSAGE);
            }
        }
    } else {
        try {
            jwt.verify(decryptedToken, CONSTANTS.TOKEN.REFRESH_GENERATOR_KEY);
            var tokenDecoded = jwt.decode(decryptedToken);
            var email = tokenDecoded.email;
            var id = tokenDecoded.id;
            var newToken = tokenHandler.create(email, id);
            res.status(200).send(newToken);
        } catch(error) {
            return res.status(ERROR_CODES.FORBIDDEN.STATUS)
                .send(ERROR_CODES.FORBIDDEN.MESSAGE);
        }
    }
}

module.exports = {
    validateToken: validateToken
};