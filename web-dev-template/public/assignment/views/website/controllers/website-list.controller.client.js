(function () {
    angular
        .module("AppMaker")
        .controller("WebsiteListController",websiteListController);

    function websiteListController(WebsiteService,$routeParams){
        var vm = this;
        vm.userId = $routeParams.uid;

        (function (){
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        })();
    }
})();