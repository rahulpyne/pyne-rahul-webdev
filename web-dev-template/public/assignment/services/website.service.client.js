(function () {
    angular
        .module("AppMaker")
        .factory("WebsiteService",websiteService);

    function websiteService(){
        var websites = [];

        (function (){
            websites = [
                { "_id": "123", "name": "Facebook", update: new Date(),    "developerId": "456", "description": "Lorem" },
                { "_id": "234", "name": "Tweeter", update: new Date(),     "developerId": "456", "description": "Lorem" },
                { "_id": "456", "name": "Gizmodo", update: new Date(),     "developerId": "456", "description": "Lorem" },
                { "_id": "567", "name": "Tic Tac Toe", update: new Date(), "developerId": "123", "description": "Lorem" },
                { "_id": "678", "name": "Checkers", update: new Date(),    "developerId": "123", "description": "Lorem" },
                { "_id": "789", "name": "Chess", update: new Date(),       "developerId": "234", "description": "Lorem" }
            ];
        })();
        var api = {
            "findWebsitesByUser":findWebsitesByUser,
            "findWebsiteById":findWebsiteById,
            "updateWebsite":updateWebsite,
            "deleteWebsite":deleteWebsite,
            "createWebsite":createWebsite
        };
        return api;

        function createWebsite(userId, website){
            var newWebsite = {};
            newWebsite.developerId = userId;
            newWebsite.name = website.name;
            newWebsite.update = new Date();
            newWebsite.description = website.description;
            if(websites){
                newWebsite._id = websites[websites.length - 1]._id + 1;
            }
            else{
                newWebsite._id = 1;
            }
            websites.push(newWebsite);
        }

        function deleteWebsite(websiteId){
            for(var w in websites){
                if(websites[w]._id == websiteId){
                    websites.splice(w,1);
                    return true;
                }
            }
            return false;
        }

        function updateWebsite(websiteId, website){
            for(var w in websites){
                if(websites[w]._id == websiteId){
                    websites[w].name = website.name;
                    websites[w].update = new Date();
                    websites[w].description = website.description;
                    return angular.copy(websites[w]);
                }
            }
            return null;
        }

        function findWebsiteById(websiteId){
            for(var w in websites){
                if(websites[w]._id == websiteId){
                    return angular.copy(websites[w]);
                }
            }
            return null;
        }

        function findWebsitesByUser(userId){
            var websiteUser = [];
            for(w in websites){
                if(websites[w].developerId == userId){
                    websiteUser.push(angular.copy(websites[w]));
                }
            }
            return websiteUser;
        }


    }
})();