var mongoose = require('mongoose');
var cryptHandler = require('../utils/crypto-handler.js');
var CONSTANTS = require('../config/config-keys.json');

var userSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: true, enum: ['male', 'female']},
    birthday: { type: Date, required: true },
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }]
});

userSchema.pre('save', function(next) {
    this.password = cryptHandler.encrypt(this.password);
    next();
});

userSchema.methods.validatePassword = function(password) {
    var decryptedPassword = cryptHandler.decrypt(this.password);
    return decryptedPassword === password;
};

var User = mongoose.model('User', userSchema);

module.exports = User;
