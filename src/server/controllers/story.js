(function () {
    'use strict';

    var story = require('../models/story.js');

    function getAll(req, res) {
        story.find({projectId: req.params.projectId})
            .then(function (result) {
                if (!result || result.length === 0) {
                    res.sendStatus(404);
                    return;
                }

                res.send(result);
            }).catch(function (err) {
                res.sendStatus(500);
            });
    }

    function getOne(req, res) {
        story.findOne({storyId: req.params.storyId})
            .then(function (result) {
                if (!result || result.length === 0) {
                    res.sendStatus(404);
                    return;
                }
                res.send(result);
            }).catch(function (err) {
                res.sendStatus(500);
            });
    }

    function save(req, res) {
        var params = {
            title: req.body.title,
            description: req.body.description,
            type: req.body.type,
            points: req.body.points,
            status: req.body.status,
            projectId: req.params.projectId
        };

        story.create(params)
            .then(function (result) {
                res.send(result);
            }).catch(function (err) {
                res.sendStatus(500);
            });
    }

    function remove(req, res) {
        story.findOneAndRemove({storyId: req.params.storyId})
            .then(function (result) {
                if (!result || result.length === 0) {
                    res.sendStatus(404);
                    return;
                }

                res.send(result);
            }).catch(function (err) {
                res.sendStatus(500);
            });
    }

    function update(req, res) {
        var params = {
            title: req.body.title,
            description: req.body.description,
            type: req.body.type,
            points: req.body.points,
            status: req.body.status,
            projectId: req.params.projectId
        };

        story.findOneAndUpdate({storyId: req.params.storyId}, params, {new: true})
            .then(function (result) {
                if (!result || result.length === 0) {
                    res.sendStatus(404);
                    return;
                }

                res.send(result);
            }).catch(function (err) {
                res.sendStatus(500);
            });
    }

    module.exports = {
        getAll: getAll,
        getOne: getOne,
        save: save,
        remove: remove,
        update: update
    };
})();
