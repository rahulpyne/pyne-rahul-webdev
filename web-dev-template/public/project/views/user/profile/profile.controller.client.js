(function () {
    
    angular
        .module('MCApp')
        .controller('ProfileController', ProfileController);
    
    function ProfileController($stateParams) {

        var vm = this;
        vm.userId = $stateParams.userId;

        function init() {

        }
        init();

    }
    
})();