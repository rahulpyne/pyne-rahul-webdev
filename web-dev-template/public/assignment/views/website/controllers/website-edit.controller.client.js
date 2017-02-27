/**
 * Created by Rahulpyne on 14-Feb-17.
 */
(function () {
    angular
        .module("AppMaker")
        .controller("WebsiteEditController", websiteEditController);

    function websiteEditController(WebsiteService, $routeParams, $location) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;

        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init() {
            var promise = WebsiteService.findWebsitesByUser(vm.uid);
            promise.success(function (websites) {
                vm.websites = websites;
            });
            var promise1 = WebsiteService.findWebsiteById(vm.wid);
            promise1.success(function (website) {
                vm.editWebsite = website;
            });
        }

        init();

        function deleteWebsite() {
            var promise = WebsiteService.deleteWebsite(vm.wid);
            promise.success(function () {
                $location.url("/user/" + vm.uid + "/website");
            })
                .error(function () {
                    vm.error = "Encountered a problem. Could not delete";
                });
        }

        function updateWebsite(wid) {
            var promise = WebsiteService.updateWebsite(wid, vm.editWebsite);
            promise.success(function (web) {
                if (web) {
                    $location.url("/user/" + vm.uid + "/website");
                }
            })
                .error(function () {
                    vm.error = "Encountered a problem. Kindly try again later.";
                });
        }


    }

})();