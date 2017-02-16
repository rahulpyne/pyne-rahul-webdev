/**
 * Created by Rahulpyne on 14-Feb-17.
 */
(function(){
    angular
        .module("AppMaker")
        .controller("ProfileController",profileController);

    function profileController(UserService,$routeParams){
        var vm = this;

        var uid = $routeParams.uid;
        //event handlers
        vm.update = update;
        function init() {
            vm.user = UserService.findUserById(uid);
        } init();
        function update(){
            var user = UserService.updateUser(uid,vm.user);
            if(user){
                vm.message = "User details successfully updated";
            }
            else{
                vm.error = "Unable to update user";
            }
        }
    }

})();