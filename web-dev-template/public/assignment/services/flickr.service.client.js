/**
 * Created by Rahulpyne on 22-Mar-17.
 */
(function(){
    angular
        .module("AppMaker")
        .service("FlickrService", FlickrService);

    var key = "57ed1c0fe964a58c48b8487e803a649b";
    var secret = "05cc69821e7ba687";
    var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

    function FlickrService($http){

        var api = {
            searchPhotos : searchPhotos
        };
        return api;



        function searchPhotos(searchTerm){
            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchTerm);
            return $http.get(url);
        }

    }
})();