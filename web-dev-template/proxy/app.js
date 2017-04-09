module.exports = function (app) {
    require('./services/movie.service.server')(app);
};