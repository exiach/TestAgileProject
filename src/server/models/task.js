(function() {

    'use strict';

    var mongoose = require('mongoose');

    var taskSchema = mongoose.Schema({
        description: { type: String, required: true },
        completed: { type: Boolean, default: false }
    });

    var Task = mongoose.model('Task', taskSchema);

    module.exports = Task;

}());