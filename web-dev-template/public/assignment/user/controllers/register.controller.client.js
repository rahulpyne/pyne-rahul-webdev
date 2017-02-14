/**
 * Created by Rahulpyne on 14-Feb-17.
 */
(function(){
    angular
        .module("AppMaker")
        .controller("RegisterController",registerController);

    function registerController($location,UserService){
        var vm = this;

        vm.addnew = addnew;

        function addnew(user) {
            if (user && (user.password == user.vpassword)) {
                nuser = UserService.createUser(user);
                $location.url("/user/"+nuser._id);
            }
            else{
                vm.error = "Encountered an error, please re-enter the details."
            }
        }
    }
})();