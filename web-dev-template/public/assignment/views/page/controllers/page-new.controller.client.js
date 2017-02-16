/**
 * Created by Rahulpyne on 14-Feb-17.
 */
(function (){
    angular
        .module("AppMaker")
        .controller("PageNewController",pageNewController);

    function pageNewController(PageService,$routeParams,$location){
        var vm = this;
        vm.params  ={};
        vm.params.uid = $routeParams.uid;
        vm.params.wid = $routeParams.wid;

        //event Handlers
        vm.createPage = createPage;

        function init(){
            vm.pages = PageService.findPageByWebsiteId(vm.params.wid);
        } init();

        function createPage(page){
            if(page){
                PageService.createPage(vm.params.wid,page);
                $location.url("/user/"+vm.params.uid+"/website/"+vm.params.wid+"/page");
            }
            else{
                vm.error = "Encountered a problem. Please enter details and try again."
            }
        }

    }

})();