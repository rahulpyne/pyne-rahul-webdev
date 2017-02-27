/**
 * Created by Rahulpyne on 14-Feb-17.
 */
(function(){
    angular
        .module("AppMaker")
        .controller("PageListController",pageListController);

    function pageListController(PageService, $routeParams){
        var vm = this;
        vm.params = {};
        vm.params.uid = $routeParams.uid;
        vm.params.wid = $routeParams.wid;

        function init(){
            var promise = PageService.findPageByWebsiteId(vm.params.wid);
            promise.success(function(pages){
                vm.pages = pages;
            });
        } init();
    }
})();