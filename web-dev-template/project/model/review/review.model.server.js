module.exports = function (mongoose) {

    var ReviewSchema = require('./review.schema.server')(mongoose);
    var MCReview = mongoose.model('MCReview', ReviewSchema);

    var api = {
        addReview: addReview,
        findAllReviewsForMovieId: findAllReviewsForMovieId,
        findAllReviewsForId: findAllReviewsForId,
        findAllReviewsForUserId: findAllReviewsForUserId,
        FindReviewById: findReviewById,
        updateReview: updateReview,
        deleteReview: deleteReview
    };
    return api;

    function addReview(userId, mid, review) {
        review._user = userId;
        review.movieId = mid;
        return MCReview.create(review);
    }

    function findAllReviewsForMovieId(movieId) {
        return MCReview.find({movieId: movieId});
    }
    
    function findAllReviewsForId(mid) {
        return MCReview.find({movieId: mid});
    }
    
    function findAllReviewsForUserId(userId) {
        return MCReview.find({_user: userId});
    }
    
    function findReviewById(reviewId) {
        return MCReview.findById(reviewId);
    }
    
    function updateReview(reviewId, review) {
        delete review._id;
        review.timestamp = Date.now();
        return MCReview.update({_id: reviewId}, {$set: review});
    }

    function deleteReview(reviewId) {
        return MCReview.remove({_id: reviewId});
    }

};