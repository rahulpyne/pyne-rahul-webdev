module.exports = function (mongoose) {

    var MovieSchema = mongoose.Schema({
        movieId: {type: String, unique: true},
        title: String,
        imageUrl: String
    }, {collection: 'mc.movie'});
    return MovieSchema;

};