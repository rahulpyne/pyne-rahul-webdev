/**
 * Created by Rahulpyne on 14-Feb-17.
 */
(function(){
    angular
        .module("AppMaker")
        .controller("WebsiteNewController",websiteNewController);

    function websiteNewController(WebsiteService,$routeParams,$location){
        var vm = this;
        vm.uid = $routeParams.uid;
        // event handlers
        vm.createWebsite = createWebsite;

        (function(){
            vm.websites = WebsiteService.findWebsitesByUser(vm.uid);
        })();

        function createWebsite(website){
            if(website){
                WebsiteService.createWebsite(vm.uid, website);
                $location.url("/user/"+vm.uid+"/website");
            }
            else{
                vm.error = "Encountered a problem, kindly try again."
            }
        }

    }
})();