module.exports = function (app) {

    var http = require('http');

    var TMDKey = process.env.TMDKey || "185ca0e9b0c700b8ade3a120e6a49856";
    var baseUrl = "api.themoviedb.org";
    var path = "/3/SEARCH_PARAM?api_key=API_KEY&language=en";

    var popularSearch = "discover/movie";
    var popularSort = "&sort_by=popularity.desc";
    var popularPage = "&page=PAGE";

    var similarMovies = "movie/MOVIE_ID/similar";

    var topMovies = "movie/top_rated";

    var upcomingMovies = "movie/upcoming";

    var genreList = "genre/movie/list";

    var movieCredits = "movie/MOVIE_ID/credits";

    var movieDetails = "movie/MOVIE_ID";

    var movieSearch = "search/movie";
    var movieName = "&query=TITLE";
    var moviePage = "&page=PAGE";

    var movieVideos = "movie/MOVIE_ID/videos";

    var currentMovies = "movie/now_playing";

    var movieReviews = "movie/MOVIE_ID/reviews";

    app.get('/mc/movie/popular/:page', findPopularMovies);
    app.get('/mc/movie/similar/:mid', findSimilarMovies);
    app.get('/mc/movie/top', findTopMovies);
    app.get('/mc/movie/upcoming', findUpcomingMovies);
    app.get('/mc/movie/genres', getGenreList);
    app.get('/mc/movie/credits/:mid', getMovieCredits);
    app.get('/mc/movie/details/:mid', getMovieDetailsById);
    app.get('/mc/movie/search/:title/page/:page', getMoviesByTitle);
    app.get('/mc/movie/video/:mid', getVideoKey);

    function findPopularMovies(req, res) {
        var page = req.params['page'];
        var options = {
            host: baseUrl,
            path: path
                .replace("SEARCH_PARAM", popularSearch)
                .replace("API_KEY", TMDKey)
                + popularSort
                + popularPage.replace("PAGE", page)
        };
        var callback = function (response) {
            var str = '';
            response.on('data', function (chunk) {
                str += chunk;
            });
            response.on('end', function () {
                res.writeHead(200, {"Content-Type": "application/json"});
                res.end(str);
            });
        };
        http.request(options, callback).end();
    }

    function findSimilarMovies(req, res) {
        var movieId = req.params['mid'];
        var options = {
            host: baseUrl,
            path : path
                .replace("SEARCH_PARAM", similarMovies)
                .replace("API_KEY", TMDKey)
                .replace("MOVIE_ID", movieId)
        };
        var callback = function (response) {
            var str = '';
            response.on('data', function (chunk) {
                str += chunk;
            });
            response.on('end', function () {
                res.writeHead(200, {"Content-Type": "application/json"});
                res.end(str);
            });
        };
        http.request(options, callback).end();
    }

    function findTopMovies(req, res) {
        var options = {
            host: baseUrl,
            path: path
                .replace("SEARCH_PARAM", topMovies)
                .replace("API_KEY", TMDKey)
        };
        var callback = function (response) {
            var str = '';
            response.on('data', function (chunk) {
                str += chunk;
            });
            response.on('end', function () {
                res.writeHead(200, {"Content-Type": "application/json"});
                res.end(str);
            });
        };
        http.request(options, callback).end();
    }

    function findUpcomingMovies(req, res) {
        var options = {
            host: baseUrl,
            path: path
                .replace("SEARCH_PARAM", upcomingMovies)
                .replace("API_KEY", TMDKey)
        };
        var callback = function (response) {
            var str = '';
            response.on('data', function (chunk) {
                str += chunk;
            });
            response.on('end', function () {
                res.writeHead(200, {"Content-Type": "application/json"});
                res.end(str);
            });
        };
        http.request(options, callback).end();
    }

    function getGenreList(req, res) {
        var options = {
            host: baseUrl,
            path: path
                .replace("SEARCH_PARAM", genreList)
                .replace("API_KEY", TMDKey)
        };
        var callback = function (response) {
            var str = '';
            response.on('data', function (chunk) {
                str += chunk;
            });
            response.on('end', function () {
                res.writeHead(200, {"Content-Type": "application/json"});
                res.end(str);
            });
        };
        http.request(options, callback).end();
    }

    function getMovieCredits(req, res) {
        var movieId = req.params['mid'];
        var options = {
            host: baseUrl,
            path: path
                .replace("SEARCH_PARAM", movieCredits)
                .replace("API_KEY", TMDKey)
                .replace("MOVIE_ID", movieId)
        };
        var callback = function (response) {
            var str = '';
            response.on('data', function (chunk) {
                str += chunk;
            });
            response.on('end', function () {
                res.writeHead(200, {"Content-Type": "application/json"});
                res.end(str);
            });
        };
        http.request(options, callback).end();
    }

    function getMovieDetailsById(req, res) {
        var movieId = req.params['mid'];
        var options = {
            host: baseUrl,
            path: path
                .replace("SEARCH_PARAM", movieDetails)
                .replace("API_KEY", TMDKey)
                .replace("MOVIE_ID", movieId)
        };
        var callback = function (response) {
            var str = '';
            response.on('data', function (chunk) {
                str += chunk;
            });
            response.on('end', function () {
                res.writeHead(200, {"Content-Type": "application/json"});
                res.end(str);
            });
        };
        http.request(options, callback).end();
    }

    function getMoviesByTitle(req, res) {
        var movieTitle = req.params['title'];
        var page = req.params['page'];
        var options = {
            host: baseUrl,
            path: path
                .replace("SEARCH_PARAM", movieSearch)
                .replace("API_KEY", TMDKey)
                + movieName.replace("TITLE", movieTitle)
                + moviePage.replace("PAGE", page)
        };
        var callback = function (response) {
            var str = '';
            response.on('data', function (chunk) {
                str += chunk;
            });
            response.on('end', function () {
                res.writeHead(200, {"Content-Type": "application/json"});
                res.end(str);
            });
        };
        http.request(options, callback).end();
    }

    function getVideoKey(req, res) {
        var movieId = req.params['mid'];
        var options = {
            host: baseUrl,
            path: path
                .replace("SEARCH_PARAM", movieVideos)
                .replace("API_KEY", TMDKey)
                .replace("MOVIE_ID", movieId)
        };
        var callback = function (response) {
            var str = '';
            response.on('data', function (chunk) {
                str += chunk;
            });
            response.on('end', function () {
                res.writeHead(200, {"Content-Type": "application/json"});
                res.end(str);
            });
        };
        http.request(options, callback).end();
    }

};