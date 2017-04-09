(function () {

    angular
        .module('MCApp')
        .factory('UserService', UserService);

    function UserService($rootScope, $http) {

        var api = {
            createUserByAdmin: createUserByAdmin,
            deleteUserByAdmin: deleteUserByAdmin,
            findAllUsersForAdmin: findAllUsersForAdmin,
            updateUserByAdmin: updateUserByAdmin,

            deleteUserById: deleteUserById,
            findAllFollowingUsers: findAllFollowingUsers,
            findAllFollowers: findAllFollowers,
            findAllLikedMovies: findAllLikedMovies,
            findUserById: findUserById,
            follow: follow,
            getCurrentUser: getCurrentUser,
            isFollowing: isFollowing,
            isLiked: isLiked,
            like: like,
            login: login,
            logout: logout,
            register: register,
            setCurrentUser: setCurrentUser,
            unfollow: unfollow,
            unlike: unlike,
            updateUser: updateUser
        };
        return api;
        
        function createUserByAdmin(user) {
            var url = "/mc/admin/user";
            return $http.post(url, user);
        }

        function deleteUserByAdmin(userId) {
            var url = "/mc/admin/user/" + userId;
            return $http.delete(url);
        }

        function findAllUsersForAdmin() {
            var url = "/mc/admin/users";
            return $http.get(url);
        }

        function updateUserByAdmin(userId, user) {
            var url = "/mc/admin/user/" + userId;
            return $http.put(url, user);
        }

        function deleteUserById(userId) {
            var url = "/mc/user/" + userId;
            return $http.delete(url);
        }

        function findAllFollowingUsers(userId) {
            var url = "/mc/user/" + userId + "/following";
            return $http.get(url);
        }

        function findAllFollowers(userId) {
            var url = "/mc/user/" + userId + "/followers";
            return $http.get(url);
        }

        function findAllLikedMovies(userId) {
            var url = "/mc/user/" + userId + "/likes";
            return $http.get(url);
        }

        function findUserById(userId) {
            var url = "/mc/user/" + userId;
            return $http.get(url);
        }

        function follow(userId, followId) {
            var url = "/mc/user/" + userId + "/follow/" + followId;
            return $http.put(url);
        }

        function getCurrentUser() {
            var url = "/mc/loggedin";
            return $http.get(url);
        }
        
        function isFollowing(userId, followId) {
            var url = "/mc/user/" + userId + "/isfollowing/" + followId;
            return $http.get(url);
        }
        
        function isLiked(userId, movieId) {
            var url = "/mc/user/" + userId + "/movie/" + movieId + "/isLiked";
            return $http.get(url);
        }
        
        function like(userId, movieId) {
            var url = "/mc/user/" + userId + "/movie/" + movieId + "/like";
            return $http.put(url);
        }
        
        function login(user) {
            var url = "/mc/login";
            return $http.post(url, user);
        }
        
        function logout() {
            var url = "/mc/logout";
            return $http.post(url);
        }
        
        function register(user) {
            var url = "/mc/register";
            return $http.post(url, user);
        }
        
        function setCurrentUser(user) {
            $rootScope.user = user;
        }

        function unfollow(userId, unfollowId) {
            var url = "/mc/user/" + userId + "/unfollow/" + unfollowId;
            return $http.put(url);
        }

        function unlike(userId, movieId) {
            var url = "/mc/user/" + userId + "/movie/" + movieId + "/unlike";
            return $http.put(url);
        }

        function updateUser(userId, user) {
            var url = "/mc/user/" + userId;
            return $http.put(url, user);
        }

    }

})();