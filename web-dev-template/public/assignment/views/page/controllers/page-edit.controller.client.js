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
            vm.pages = PageService.findPageByWebsiteId(vm.params.wid);
            vm.editPage = PageService.findPageById(vm.params.pid);
        } init();

        function updatePage(){
            var bool = PageService.updatePage(vm.params.pid,vm.editPage);
            if(bool){
                $location.url("/user/"+vm.params.uid+"/website/"+vm.params.wid+"/page")
            }
            else{
                vm.error = "Encountered a problem, kindly try again."
            }
        }

        function deletePage(){
            var bool = PageService.deletePage(vm.params.pid);
            if(bool){
                $location.url("/user/"+vm.params.uid+"/website/"+vm.params.wid+"/page");
            }
            else{
                vm.error = "Encountered a problem, kindly try again";
            }
        }
    }
})();