module.exports = function (mongoose) {

    var MovieSchema = require('./movie.schema.server')(mongoose);
    var MCMovie = mongoose.model('MCMovie', MovieSchema);

    var api = {
        addMovie: addMovie,
        findMovieById: findMovieById,
        findMovieByMovieId: findMovieByMovieId,
        findAllLikedMovies: findAllLikedMovies,
        deleteMovieById: deleteMovieById,
        deleteMovieByMovieId: deleteMovieByMovieId
    };
    return api;

    function addMovie(movie) {
        movie.movieId = movie.id.toString();
        return MCMovie.create(movie);
    }
    
    function findMovieById(id) {
        return MCMovie.findById(id);
    }

    function findMovieByMovieId(movieId) {
        return MCMovie.findOne({movieId: movieId});
    }
    
    function findAllLikedMovies(movieIds) {
        return MCMovie.find({movieId: {$in: movieIds}});
    }

    function deleteMovieById(id) {
        return MCMovie.remove({_id: id});
    }

    function deleteMovieByMovieId(movieId) {
        return MCMovie.remove({movieId: movieId});
    }

};