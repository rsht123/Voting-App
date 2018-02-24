const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = module.exports = mongoose.model('User', userSchema);

module.exports.getUsername = function(username, callback) {
    User.findOne({username: username}, callback);
}

module.exports.comparePassword = function(password, userPassword, callback) {
    bcrypt.compare(password, userPassword, callback);
}

module.exports.validateUserInfo = function(user, callback) {
    User.findOne({username: user.username}, function(err, isUsername) {
        if(err) throw err;
        if(isUsername) {
            return callback(null, false, "Username not available");
        }
        User.findOne({email: user.email}, function(err, emailUser) {
            if(err) throw err;
            if(emailUser) {
                return callback(null, false, "Email not available");
            }
            return callback(null, true)
        })
    })
}

module.exports.hashPassword = function(user, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            user.password = hash;
            callback(null, user);
        })
    })
}