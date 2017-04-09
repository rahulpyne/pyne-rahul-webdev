module.exports = function(app, database, security) {
    var models = database.mcmodels();
    require('./services/user.service.server')(app, models, security);
    require('./services/movie.service.server')(app, models);
    require('./services/review.service.server')(app, models);
};