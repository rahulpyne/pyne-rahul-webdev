/**
 * Created by Rahulpyne on 14-Feb-17.
 */
(function(){
    angular
        .module("AppMaker")
        .factory("PageService",pageService);

    function pageService(){
        var pages = [];

        (function(){
            pages = [
                { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
                { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
                { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
            ]
        })();

        var api={
            "createPage":createPage,
            "findPageByWebsiteId":findPageByWebsiteId,
            "findPageById":findPageById,
            "updatePage":updatePage,
            "deletePage":deletePage
        }
        return api;

        function createPage(wid,page){
            var newpage = {};
            newpage.websiteId = wid;
            newpage.name = page.name;
            newpage.description = page.description;
            if(pages){
                newpage._id = pages[pages.length - 1]._id + 1;
            }
            else{
                newpage._id = 1;
            }
            pages.push(newpage);
        }

        function findPageByWebsiteId(wid){
            var webPages = [];
            for(var p in pages){
                if(pages[p].websiteId == wid){
                    webPages.push(angular.copy(pages[p]));
                }
            }
            return webPages;
        }

        function findPageById(pid){
            for(var p in pages){
                if(pages[p]._id == pid){
                    return angular.copy(pages[p]);
                }
            }
            return null;
        }

        function updatePage(pid,page){
            for(var p in pages){
                if(pages[p]._id == pid){
                    pages[p].name = page.name;
                    pages[p].description = page.description;
                    return angular.copy(pages[p]);
                }
            }
            return null;
        }

        function deletePage(pid){
            for(var p in pages){
                if(pages[p]._id == pid){
                    pages.splice(p,1);
                    return true;
                }
            }
            return false;
        }
    }
})();