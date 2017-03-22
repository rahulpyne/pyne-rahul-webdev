/**
 * Created by Rahulpyne on 21-Mar-17.
 */

var mongoose = require('mongoose');
var q = require('q');
var websiteSchema = require('./website.schema.server');
var websiteModel = mongoose.model('Website', websiteSchema);

// api
websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;

module.exports = websiteModel;

var userModel = require('../user/user.model.server');

function createWebsiteForUser(userId, website) {
    var deffered = q.defer();
    website._user = userId;
    websiteModel.create(website, function (err, website) {
        if(err)
            deffered.reject(err);
        else {
            userModel.findUserById(website._user)
                .then(function (user) {
                    user.websites.push(website._id);
                    user.save(function (err) {
                        if(err)
                            deffered.reject(err);
                        else
                            deffered.resolve(website);
                    });
                });
        }
    });
    return deffered.promise;
}

function findAllWebsitesForUser(userId) {
    var deffered = q.defer();
    websiteModel.find({_user: userId}, function (err, websites) {
        if(err)
            deffered.reject(err);
        else
            deffered.resolve(websites);
    });
    return deffered.promise;
}

function findWebsiteById(websiteId) {
    var deffered = q.defer();
    websiteModel.findById(websiteId, function (err, website) {
        if(err)
            deffered.reject(err);
        else
            deffered.resolve(website);
    });
    return deffered.promise;
}

function updateWebsite(websiteId, website) {
    var deffered = q.defer();
    websiteModel.findByIdAndUpdate(websiteId, website, function (err, website) {
        if(err)
            deffered.reject(err);
        else
            deffered.resolve(website);
    });
    return deffered.promise;
}

function deleteWebsite(websiteId) {
    var deffered = q.defer();
    websiteModel.findByIdAndRemove(websiteId, function (err, website) {
        if(err)
            deffered.reject(err);
        else {
            website.remove();
            deffered.resolve(website);
        }
    });
    return deffered.promise;
}
