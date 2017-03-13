
'use strict';

var mongoose = require('mongoose');
var relationship = require('mongoose-relationship');

var projectSchema = mongoose.Schema({
    title: { type: String, required: 'is required!' },
    description: { type: String, required: 'is required!' },
    iterationLength: {type: String, required: 'is required!' },
    startDate: { type: Date, default: Date.now },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', childPath: 'projects', validateExistence: 'true' }]
});

projectSchema.plugin(relationship, { relationshipPathName:'users' });
var Project = mongoose.model('Project', projectSchema);

module.exports = Project;
