/**
 * Created by Rahulpyne on 14-Feb-17.
 */
(function () {
    angular
        .module("AppMaker")
        .controller("RegisterController", registerController);

    function registerController($location, UserService) {
        var vm = this;

        // event handlers
        vm.addnew = addnew;

        function init() {
        }

        init(); // act as the init function

        function addnew(user) {
            if (user) {
                var promise = UserService.findUserByUsername(user.username);
                promise.success(function () {
                    if (user.password == user.vpassword) {
                        var promise = UserService.createUser(user);
                        promise.success(function (nuser) {
                            if (nuser) {
                                $location.url("/user/" + nuser._id);
                            }
                        });
                    }
                    else {
                        vm.error = "Passwords mismatch. Kindly re-enter the passwords."
                    }
                })
                    .error(function () {
                        vm.error = "Username exists, kindly enter a new user name."
                    });
            }
            else {
                vm.error = "Encountered an error, please re-enter the details."
            }
        }
    }
})();