module.exports = function(){
    var connectionString = 'mongodb://127.0.0.1:27017/moviecritic';

    if(process.env.MLAB_USERNAME) {
        connectionString = process.env.MLAB_USERNAME + ":" +
            process.env.MLAB_PASSWORD + "@" +
            process.env.MLAB_HOST + ':' +
            process.env.MLAB_PORT + '/' +
            process.env.MLAB_APP_NAME;
    }

    var mongoose = require("mongoose");
    var q = require('q');
    mongoose.connect(connectionString);
    mongoose.Promise = q.Promise;

    var projectModels = require('../project/model/models.server')(mongoose);

    var api = {
        mcmodels: mcmodels
    };
    return api;

    function mcmodels(){
        return projectModels;
    }

};

