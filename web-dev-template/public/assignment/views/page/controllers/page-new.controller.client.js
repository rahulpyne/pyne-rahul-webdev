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
            var promise = PageService.findPageByWebsiteId(vm.params.wid);
            promise.success(function(pages){
                vm.pages = pages;
            });
        } init();

        function createPage(page){
            if(page){
                var promise = PageService.createPage(vm.params.wid,page);
                promise.success(function(){
                    $location.url("/user/"+vm.params.uid+"/website/"+vm.params.wid+"/page");
                });
            }
            else{
                vm.error = "Encountered a problem. Please enter details and try again."
            }
        }

    }

})();