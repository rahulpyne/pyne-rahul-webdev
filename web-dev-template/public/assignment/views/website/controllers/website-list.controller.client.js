(function () {
    angular
        .module("AppMaker")
        .controller("WebsiteListController",websiteListController);

    function websiteListController(WebsiteService,$routeParams){
        var vm = this;
        vm.userId = $routeParams.uid;

        function init(){
            var promise = WebsiteService.findWebsitesByUser(vm.userId);
            promise.success(function(websites){
                vm.websites = websites;
            });
        }init();
    }
})();