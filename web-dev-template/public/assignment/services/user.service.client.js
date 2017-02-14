/**
 * Created by Rahulpyne on 14-Feb-17.
 */
(function () {
    angular
        .module("AppMaker") // injecting the appropriate app
        .factory("UserService",userService); // mapping the name to the appropriate function

    function userService(){
        var users = [];

        (function () { // whenever UserService is called, the list of users is fetched.
            users = [
                {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
                {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
                {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
                {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
            ];
        })(); // acting as a constructor and initializing the required instance variables.
        // since the instance variable is defined outside, immediate invocation of function does not reduce its scope within iffy.

        var api = {
            "findUserByCredentials": findUserByCredentials, // maps the service api names to appropriate function names
            "createUser":createUser,
            "findUserById": findUserById,
            "updateUser": updateUser,
            "deleteUser": deleteUser
        }
        return api; // whenever UserService is invoked, the map of apis is returned

        function deleteUser(uid){
            for(var u in users){
                if(users[u]._id == uid){
                    users.splice(u,1);
                    break;
                }
            }
            console.log(users);
        }


        function findUserById(uid){
            for(var u in users){
                if(users[u]._id == uid){
                    return users[u];
                }
            }
            return null;
        }

        function updateUser(uid, newUser){
            var user = findUserById(uid);
            if(user){
                user.firstName = newUser.firstName;
                user.lastName = newUser.lastName;
                user.email = newUser.email;
                return user;
            }
            return null;
        }

        function createUser(user){
            var newuser={};
            newuser.username = user.username;
            newuser.firstName = user.firstname;
            newuser.lastName = user.lastname;
            newuser.password = user.password;
            newuser.email = user.email;

            if(users){
                newuser._id = users[users.length - 1]._id + 1;
            }
            else{
                newuser._id = 1;
            }
            users.push(newuser);
            return newuser;
        }

        function findUserByCredentials(username, password){
            console.log(users);
            for( var u in users){
                if(users[u].username == username && users[u].password == password){
                    return users[u];
                }
            }
            return null;
        }
    }
})();