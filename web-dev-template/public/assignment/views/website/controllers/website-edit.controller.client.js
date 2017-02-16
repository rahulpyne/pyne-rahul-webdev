/**
 * Created by Rahulpyne on 14-Feb-17.
 */
(function () {
    angular
        .module("AppMaker")
        .controller("WebsiteEditController",websiteEditController);

    function websiteEditController(WebsiteService,$routeParams,$location){
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;

        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init(){
            vm.websites = WebsiteService.findWebsitesByUser(vm.uid);
            vm.editWebsite = WebsiteService.findWebsiteById(vm.wid);
        }init();

        function deleteWebsite(){
            var bool = WebsiteService.deleteWebsite(vm.wid);
            if(bool){
                $location.url("/user/"+vm.uid+"/website");
            }
            else{
                vm.error = "Encountered a problem. Could not delete";
            }
        }

        function updateWebsite(wid) {
            var web = WebsiteService.updateWebsite(wid,vm.editWebsite);
            if(web){
                $location.url("/user/"+vm.uid+"/website");
            }
            else{
                vm.error = "Encountered a problem. Kindly try again later.";
            }
        }


    }

})();