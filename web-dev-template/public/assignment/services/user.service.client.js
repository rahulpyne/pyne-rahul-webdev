/**
 * Created by Rahulpyne on 14-Feb-17.
 */
(function () {
    angular
        .module("AppMaker") // injecting the appropriate app
        .factory("UserService",userService); // mapping the name to the appropriate function

    function userService($http){

        var api = {
            "findUserByCredentials": findUserByCredentials, // maps the service api names to appropriate function names
            "createUser":createUser,
            "findUserById": findUserById,
            "updateUser": updateUser,
            "deleteUser": deleteUser,
            "findUserByUsername":findUserByUsername
        }
        return api; // whenever UserService is invoked, the map of apis is returned

        function findUserByUsername(username) {
            return $http.get("/api/user?username="+username);
        }

        function deleteUser(uid){
            return $http.delete("/api/user/:userId"+uid);
        }

        function findUserById(userId) {
            return $http.get("/api/user/"+userId);
        }

        function updateUser(userId, newUser) {
            return $http.put("/api/user/"+userId, newUser);
        }

        function createUser(user){
            return $http.post("/api/user/", user);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/user?username="+username+"&password="+password);
        }
    }
})();