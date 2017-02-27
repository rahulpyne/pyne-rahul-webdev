(function () {
    angular
        .module("AppMaker")
        .factory("WebsiteService",websiteService);

    function websiteService($http){
        var api = {
            "findWebsitesByUser":findWebsitesByUser,
            "findWebsiteById":findWebsiteById,
            "updateWebsite":updateWebsite,
            "deleteWebsite":deleteWebsite,
            "createWebsite":createWebsite
        };
        return api;

        function createWebsite(userId, website){
            return $http.post("/api/user/"+userId+"/website", website);
        }

        function deleteWebsite(websiteId){
            return $http.delete("/api/website/"+websiteId);
        }

        function updateWebsite(websiteId, website){
            return $http.put("/api/website/"+websiteId,website);
        }

        function findWebsiteById(websiteId){
            return $http.get("/api/website/"+websiteId);
        }

        function findWebsitesByUser(userId){
            return $http.get("/api/user/"+userId+"/website");
        }

    }
})();