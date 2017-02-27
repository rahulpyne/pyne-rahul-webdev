/**
 * Created by Rahulpyne on 14-Feb-17.
 */
(function(){
    angular
        .module("AppMaker")
        .controller("PageEditController",pageEditController);

    function pageEditController(PageService, $routeParams, $location){
        var vm = this;
        vm.params={};
        vm.params.uid = $routeParams.uid;
        vm.params.wid = $routeParams.wid;
        vm.params.pid = $routeParams.pid;

        //event handlers
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;
        function init(){
            var promise = PageService.findPageByWebsiteId(vm.params.wid);
            promise.success(function(pages){
                vm.pages = pages;
            });
            var promise1 = PageService.findPageById(vm.params.pid);
            promise1.success(function(page){
                vm.editPage = page;
            });
        } init();

        function updatePage(){
            var promise = PageService.updatePage(vm.params.pid,vm.editPage);
            promise.success(function(page){
                $location.url("/user/"+vm.params.uid+"/website/"+vm.params.wid+"/page")
            })
                .error(function(){
                    vm.error = "Encountered a problem, kindly try again."
                });
        }

        function deletePage(){
            var promise = PageService.deletePage(vm.params.pid);
            promise.success(function(){
                $location.url("/user/"+vm.params.uid+"/website/"+vm.params.wid+"/page");
            })
                .error(function(){
                    vm.error = "Encountered a problem, kindly try again";
                });
        }
    }
})();