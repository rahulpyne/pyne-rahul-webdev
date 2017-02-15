/**
 * Created by Rahulpyne on 14-Feb-17.
 */
(function(){
    angular
        .module("AppMaker")
        .controller("RegisterController",registerController);

    function registerController($location,UserService){
        var vm = this;

        // event handlers
        vm.addnew = addnew;

        (function(){
        })(); // act as the init function

        function addnew(user) {
            if (user) {
                var existuser = UserService.findUserByUsername(user.username);
                if(!existuser) {
                    if (user.password == user.vpassword) {
                        nuser = UserService.createUser(user);
                        $location.url("/user/" + nuser._id);
                    }
                    else {
                        vm.error = "Passwords mismatch. Kindly re-enter the passwords."
                    }
                }
                else{
                    vm.error = "Username exists, kindly enter a new user name."
                }
            }
            else{
                vm.error = "Encountered an error, please re-enter the details."
            }
        }
    }
})();