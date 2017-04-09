module.exports = function (mongoose) {

    var ReviewSchema = mongoose.Schema({
        title: String,
        description: String,
        timestamp: {type: Date, default: Date.now()},
        movieId: String,
        _movie: {type: mongoose.Schema.Types.ObjectId, ref: 'MCMovie'},
        _user: {type: mongoose.Schema.Types.ObjectId, ref: 'MCUser'},
        rating: String
    }, {collection: 'mc.review'});
    return ReviewSchema;

};