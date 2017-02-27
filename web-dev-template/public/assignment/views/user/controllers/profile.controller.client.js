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
            var promise = UserService.findUserById(uid);
            promise.success(function(user){
                if(user){
                    vm.user = user;
                }
            });
        } init();
        function update(){
            var promise = UserService.updateUser(uid,vm.user);
            promise.success(function(user){
                if(user){
                    vm.message = "User details successfully updated";
                }
                else{
                    vm.error = "Unable to update user";
                }
            });
        }
    }

})();