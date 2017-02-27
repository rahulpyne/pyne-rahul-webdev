/**
 * Created by Rahulpyne on 14-Feb-17.
 */
(function(){
    angular
        .module("AppMaker")
        .factory("PageService",pageService);

    function pageService( $http){
        var api={
            "createPage":createPage,
            "findPageByWebsiteId":findPageByWebsiteId,
            "findPageById":findPageById,
            "updatePage":updatePage,
            "deletePage":deletePage
        }
        return api;

        function createPage(wid,page){
            return $http.post("/api/website/"+wid+"/page",page);
        }

        function findPageByWebsiteId(wid){
            return $http.get("/api/website/"+wid+"/page");
        }

        function findPageById(pid){
            return $http.get("/api/page/"+pid);
        }

        function updatePage(pid,page){
            return $http.put("/api/page/"+pid,page);
        }

        function deletePage(pid){
            return $http.delete("/api/page/"+pid);
        }
    }
})();