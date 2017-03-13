var mongoose = require('mongoose'),
    Q = require('q');

// replacing mongoose's native promise implementation with "q" promises
require('mongoose').Promise = require('q').Promise;

//TODO [10/12/2015] Read from config file when mongo's configuration gets more complex
var databaseConfig = {
    url: 'mongodb://localhost:27017',
    name: 'oildex-test'
};

function init () {
    var deferred = Q.defer(),
        db = mongoose.connection;
    
    mongoose.connect(databaseConfig.url + '/' + databaseConfig.name);

    db.once('open', function (callback) {
        console.log('Connection sucessfully stablished with database.');
        deferred.resolve();
    });

    db.on('error', function (err) {
        console.log('Could not connect to the database');
        deferred.reject(err);
    });

    return deferred.promise;
}

module.exports = {
    init: init
};