'use strict';
var Project = require('../models/project');
var user = require('../models/user');
var q = require('q');
var mailer = require('../common/nodemailer');

var PROJECT_NAME_EXIST = 'The Project name already exist';
var USER_NOT_FOUND = 'User not found';
var PROJECT_NOT_FOUND = 'Project not found';

function getAll(req, res) {
    Project.find()
        .then(function (result) {
            if (!result || result.length === 0) {
                res.sendStatus(404);
                return;
            }

            res.send(result);
        }).catch(function (error) {
            res.sendStatus(500);
        });
}

function getOne(req, res) {
    Project.findOne({_id: req.params._id})
        .then(function (result) {
            if (!result || result.length === 0) {
                res.sendStatus(404);
                return;
            }

            res.send(result);
        }).catch(function (error) {
            res.sendStatus(500);
        });
}

function save(req, res) {
    Project.findOne({title: req.body.title})
        .then(function (existingProject) {
            if (!existingProject || existingProject.length === 0) {

                Project.create(req.body)
                    .then(function (result) {
                        res.send(result);
                    }).catch(function (error) {
                        res.sendStatus(400);
                    });
            } else {
                res.statusCode = 400;
                res.send({
                    Error: PROJECT_NAME_EXIST
                });
            }
        });
}

function update(req, res) {
    Project.findOneAndUpdate({_id: req.params._id}, req.body, {new: true})
        .then(function (result) {
            if (!result || result.length === 0) {
                res.sendStatus(404);
                return;
            }

            res.send(result);
        }).catch(function (error) {
            res.sendStatus(500);
        });
}

function addUser(req, res) {
    var userPromise = user.findOne({_id: req.body.userId});
    var projectPromise =  Project.findOne({_id: req.params._id});

    q.spread([userPromise, projectPromise], function (foundUser, foundProject) {

        if (!foundProject) {
            res.statusCode = 404;
            res.send({
                error: PROJECT_NOT_FOUND
            });
            return;
        }

        if (!foundUser) {
            res.statusCode = 404;
            res.send({
                error: USER_NOT_FOUND
            });
            return;
        }

        foundProject.users.push(foundUser);
        foundProject.save().then(function (results) {
            mailer.sendUserAddedToProjectNotification(foundUser, foundProject);
            res.send(results);
        }).catch(function (e) {
            res.sendStatus(409);
        });
    }).catch(function (error) {
        res.sendStatus(500);
    });
}

function getUsers (req, res) {
    Project.findOne({_id: req.params._id}, 'users')
        .populate('users')
        .then(function (result) {
            if (!result || result.length === 0) {
                res.sendStatus(404);
                return;
            }

            res.send(result);
        }).catch(function (error) {
            res.sendStatus(500);
        });
}

module.exports = {
    getAll: getAll,
    getOne: getOne,
    save: save,
    update: update,
    addUser: addUser,
    getUsers: getUsers
};
