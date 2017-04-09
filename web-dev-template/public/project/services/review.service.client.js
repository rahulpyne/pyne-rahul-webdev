(function () {

    angular
        .module('MCApp')
        .factory('ReviewService', ReviewService);

    function ReviewService($http) {

        var api = {
            addReview: addReview,
            deleteReview: deleteReview,
            findAllReviewsForMovieId: findAllReviewsForMovieId,
            findAllReviewsForUserId: findAllReviewsForUserId,
            updateReview: updateReview
        };
        return api;
        
        function addReview(userId, movieId, review) {
            var url = "/mc/user/" + userId + "/movie/" + movieId;
            return $http.post(url, review);
        }

        function deleteReview(reviewId) {
            var url = "/mc/review/" + reviewId;
            return $http.delete(url);
        }
        
        function findAllReviewsForMovieId(movieId) {
            var url = "/mc/movie/" + movieId + "/reviews";
            return $http.get(url);
        }

        function findAllReviewsForUserId(userId) {
            var url = "/mc/user/" + userId + "/reviews";
            return $http.get(url);
        }
        
        function updateReview(reviewId, review) {
            var url = "/mc/review/" + reviewId;
            return $http.put(url, review);
        }

    }

})();