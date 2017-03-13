var User = require('../models/user.js');
var mailer = require('../common/nodemailer');
var REST_ERROR_CODES = require('../utils/rest-error-codes.json');

function save (req, res) {
    User.findOne({email: req.body.email}).then(function (data) {
        if (data) {
            res.status(REST_ERROR_CODES.USER_EXIST.STATUS)
                .send(REST_ERROR_CODES.USER_EXIST.MESSAGE);
            return true;
        }
    }).then(function (userExist) {
        if (!userExist) {
            User.create(req.body).then(function(user) {
                mailer.sendSignUpUserNotification(user);
                return res.send(user);
            });
        }
    }).catch(function (error) {
        res.status(REST_ERROR_CODES.INTERNAL_ERROR.STATUS)
            .send(REST_ERROR_CODES.INTERNAL_ERROR.MESSAGE);
    });
}

function getAll (req, res) {
    User.find({}, {password: 0, token:0})
        .then(function (result) {
            if (!result || result.length === 0) {
                res.sendStatus(404);
                return;
            }
            res.send(result);
        }).catch(function (err) {
            res.status(REST_ERROR_CODES.INTERNAL_ERROR.STATUS)
                .send(REST_ERROR_CODES.INTERNAL_ERROR.MESSAGE);
        });
}

function getOne (req, res) {
    var userId = req.params.userId;

    User.findById(userId, {}, {password: 0, token:0})
        .then(function (result) {
            if (!result || result.length === 0) {
                res.sendStatus(404);
                return;
            }

            res.send(result);
        }).catch(function (err) {
            res.status(REST_ERROR_CODES.INTERNAL_ERROR.STATUS)
                .send(REST_ERROR_CODES.INTERNAL_ERROR.MESSAGE);
        });
}

function update(req, res) {
    var userId = req.params.userId;

    User.findOneAndUpdate(userId, req.body, {new: true})
        .then (function (updatedUser) {
            if (!updatedUser || updatedUser.length === 0) {
                res.sendStatus(404);
            }
            else {
                res.send({
                    id: updatedUser._id,
                    firstName: updatedUser.firstName,
                    email: updatedUser.email
                });
            }
        }).catch(function (error) {
            res.status(REST_ERROR_CODES.INTERNAL_ERROR.STATUS)
                .send(REST_ERROR_CODES.INTERNAL_ERROR.MESSAGE);
    });
}

function remove (req, res) {
    var userId = req.params.userId;

    User.findByIdAndRemove(userId)
        .then(function (result) {
            if (!result || result.length === 0) {
                res.sendStatus(404);
                return;
            }
            res.send(result);
        }).catch(function (err) {
            res.status(REST_ERROR_CODES.INTERNAL_ERROR.STATUS)
                .send(REST_ERROR_CODES.INTERNAL_ERROR.MESSAGE);
        });
}

module.exports = {
    save: save,
    getAll: getAll,
    getOne: getOne,
    update: update,
    remove: remove
};