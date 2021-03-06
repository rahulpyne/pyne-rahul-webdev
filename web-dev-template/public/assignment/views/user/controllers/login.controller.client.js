(function () {
    angular
        .module("AppMaker")
        .controller("LoginController", loginController); // mapping the name to the appropriate function

    function loginController($location, UserService) { // passing $location instance of angular js to manipulate the urls
        // Instance of UserService is injected to access the
        var vm = this; // binding the current instance LoginController to variable vm.

        // event handlers
        vm.login = login; // binding the function to instance variable of this controller and not to scope.

        function init() {
        }

        init();


        function login(user) {
            if (user) {
                var promise = UserService.findUserByCredentials(user.username, user.password);
                promise.success(function (user) {
                    if (user) {
                        $location.url("/user/" + user._id); // replaces everything after hash with the given value in the url.
                    }
                    else {
                        vm.error = "The user does not exist"; // defining an instance variable vm.error, so that it gets mapped to model in view.
                    }
                });
            }
            else {
                vm.error = "Encountered a problem, kindly enter the details and try again."
            }
        }
    }
})();