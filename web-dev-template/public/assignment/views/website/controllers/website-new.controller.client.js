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

        function init(){
            var promise = WebsiteService.findWebsitesByUser(vm.uid);
            promise.success(function (websites) {
                vm.websites = websites;
            });
        } init();

        function createWebsite(website){
            if(website){
                var promise = WebsiteService.createWebsite(vm.uid, website);
                promise.success(function(web){
                    $location.url("/user/"+vm.uid+"/website");
                });
            }
            else{
                vm.error = "Encountered a problem, kindly try again."
            }
        }

    }
})();