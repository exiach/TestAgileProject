(function () {
    'use strict';

    var mongoose = require('mongoose');
    var autoIncrement = require('mongoose-auto-increment');

    var storySchema = mongoose.Schema({
        title: {type: String, required: true},
        description: String,
        type: String,
        points: Number,
        status: String,
        projectId: String
    });

    autoIncrement.initialize(mongoose.connection);
    storySchema.plugin(autoIncrement.plugin, { model: 'Story', field: 'storyId' });
    var Story = mongoose.model('Story', storySchema);

    module.exports = Story;
})();