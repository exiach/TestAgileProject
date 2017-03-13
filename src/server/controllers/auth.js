var User = require('../models/user.js');
var TokenHandler = require('../utils/token-handler.js');
var REST_ERROR_CODES = require('../utils/rest-error-codes.json');
var mailer = require('../common/nodemailer');

function login (req, res) {
    User.findOne({email: req.body.email})
        .then(function (user) {
        if (!user) {
            res.status(REST_ERROR_CODES.USER_NOT_FOUND.STATUS)
                .send(REST_ERROR_CODES.USER_NOT_FOUND.MESSAGE);
            return true;
        }
        return user;
    }).then(function (user) {
        if (user.validatePassword(req.body.password)) {
            var token = TokenHandler.create(req.body.email, user._id);
            return res.send(token);
        } else {
            return res.status(REST_ERROR_CODES.PASSWORD_ERROR.STATUS)
                .send(REST_ERROR_CODES.PASSWORD_ERROR.MESSAGE);
        }
    }).catch(function (error) {
        res.status(REST_ERROR_CODES.INTERNAL_ERROR.STATUS)
            .send(REST_ERROR_CODES.INTERNAL_ERROR.MESSAGE);
    });
}

function signUp (req, res) {
    User.findOne({email: req.body.email}).then(function (data) {
        if (data) {
            res.status(REST_ERROR_CODES.USER_EXIST.STATUS)
                .send(REST_ERROR_CODES.USER_EXIST.MESSAGE);
            return true;
        }
    }).then(function (userExist) {
        if (!userExist) {
            User.create(req.body).then(function(user) {
                var token = TokenHandler.create(user.email, user.id);
                mailer.sendSignUpUserNotification(user);
                return res.send(token);
            });
        }
    }).catch(function (error) {
        res.status(REST_ERROR_CODES.INTERNAL_ERROR.STATUS)
            .send(REST_ERROR_CODES.INTERNAL_ERROR.MESSAGE);
    });
}

module.exports = {
    login: login,
    signUp: signUp
};