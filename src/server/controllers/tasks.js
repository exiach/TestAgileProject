var Task = require('../models/task.js');

function getAll (req, res) {
    Task.find().then(function (result) {
        if (!result || result.length === 0) {
            res.sendStatus(404);
            return;
        }

        res.send(result);
    }).catch(function (err) {
       res.sendStatus(500);
    });
}

function getOne (req, res) {
    var taskId = req.params.taskId;

    Task.findById(taskId).then(function (result) {
        if (!result || result.length === 0) {
            res.sendStatus(404);
            return;
        }

        res.send(result);
    }).catch(function (err) {
       res.sendStatus(500);
    });
}

function save (req, res) {
    var params = {
        description: req.body.description,
        completed: req.body.completed || ''
    };

    Task.create(params).then(function (result) {
        res.send(result);
    }).catch(function (err) {
        res.sendStatus(500);
    });
}

function remove (req, res) {
    var taskId = req.params.taskId;

    Task.findByIdAndRemove(taskId).then(function (result) {
        if (!result || result.length === 0) {
            res.sendStatus(404);
            return;
        }

        res.send(result);
    }).catch(function (err) {
        res.sendStatus(500);
    });
}

function update (req, res) {
    var taskId = req.params.taskId;
    var params = {
        description: req.body.description,
        completed: req.body.completed || ''
    };

    Task.findByIdAndUpdate(taskId, params, { new: true }).then(function (result) {
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
