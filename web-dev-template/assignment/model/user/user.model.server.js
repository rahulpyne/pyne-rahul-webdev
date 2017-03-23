/**
 * Created by Rahulpyne on 21-Mar-17.
 */
var model = null;
var mongoose = require('mongoose');
var q = require('q');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('User', userSchema);

// api
userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.setModel = setModel;

module.exports = userModel;

function createUser(user) {
    var deffered = q.defer(); //
    userModel.create(user, function (err, user) {
        if(err)
            deffered.reject(err);
        else
            deffered.resolve(user);
    });
    return deffered.promise;
}

function findUserById(userId) {
    var deffered = q.defer();
    userModel.findById(userId, function (err, user) {
        if(err)
            deffered.reject(err);
        else
            deffered.resolve(user);
    });
    return deffered.promise;
}

function findUserByUsername(username) {
    var deffered = q.defer();
    userModel.findOne({username: username}, function (err, user) {
        if(err)
            deffered.reject(err);
        else
            deffered.resolve(user);
    });
    return deffered.promise;
}

function findUserByCredentials(username, password) {
    var deffered = q.defer();
    userModel.findOne({username: username, password: password}, function (err, user) {
        if(err)
            deffered.reject(err);
        else
            deffered.resolve(user);
    });
    return deffered.promise;
}

function updateUser(userId, user) {
    var deffered = q.defer();
    userModel.findByIdAndUpdate(userId, user, function (err, user) {
        if(err)
            deffered.reject(err);
        else
            deffered.resolve(user);
    });
    return deffered.promise;
}

function deleteUser(userId) {
    var deffered = q.defer();
    userModel.findByIdAndRemove(userId, function (err, user) {
        if(err)
            deffered.reject(err);
        else {
            user.remove();
            deffered.resolve(user);
        }
    });
    return deffered.promise;
}

function setModel(_model) {
    model = _model;
}