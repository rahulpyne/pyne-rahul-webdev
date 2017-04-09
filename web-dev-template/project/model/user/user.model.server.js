module.exports = function (mongoose) {

    var UserSchema = require('./user.schema.server')(mongoose);
    var MCUser = mongoose.model('MCUser', UserSchema);

    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        findUserByFacebookId: findUserByFacebookId,
        findUserByGoogleId:findUserByGoogleId,
        likeMovie: likeMovie,
        unlikeMovie: unlikeMovie,
        isLiked: isLiked,
        addFollower: addFollower,
        addFollowing: addFollowing,
        removeFollowing: removeFollowing,
        removeFollower: removeFollower,
        isFollowing: isFollowing,
        findAllFollowingUsers: findAllFollowingUsers,
        findAllFollowers: findAllFollowers,
        updateUser: updateUser,
        deleteUser: deleteUser
    };
    return api;


    function createUser(user) {
        return MCUser.create(user);
    }
    
    function findAllUsers() {
        return MCUser.find();
    }

    function findUserById(userId) {
        return MCUser.findById(userId);
    }

    function findUserByUsername(username) {
        return MCUser.findOne({username: username});
    }
    
    function findUserByCredentials(username, password) {
        return MCUser.findOne({username: username, password: password});
    }

    function findUserByFacebookId(facebookId) {
        return MCUser.findOne({'facebook.id': facebookId});
    }

    function findUserByGoogleId(googleId) {
        return MCUser.findOne({'google.id': googleId});
    }
    function likeMovie(userId, mid) {
        return MCUser.update({_id: userId}, {$addToSet: {movieLikes: mid}});
    }
    
    function unlikeMovie(userId, mid) {
        return MCUser.update({_id: userId}, {$pullAll: {movieLikes: [mid]}});
    }

    function isLiked(userId, mid) {
        return MCUser.findOne({_id: userId}, {$and: [{movieLikes: {$in: [mid]}}]});
    }

    function addFollower(userId, followerId) {
        return MCUser.update({_id: userId}, {$addToSet: {followers: followerId}});
    }

    function addFollowing(userId, followingId) {
        return MCUser.update({_id: userId}, {$addToSet: {following: followingId}});
    }

    function removeFollowing(userId, followingId) {
        return MCUser.update({_id: userId}, {$pullAll: {following: [followingId]}});
    }

    function removeFollower(userId, followerId) {
        return MCUser.update({_id: userId}, {$pullAll: {followers: [followerId]}});
    }
    
    function isFollowing(userId, followId) {
        return MCUser.findOne({_id: userId, following: {$in: [followId]}});
    }
    
    function findAllFollowingUsers(userIds) {
        return MCUser.find({_id: {$in: userIds}});
    }

    function findAllFollowers(userIds) {
        return MCUser.find({_id: {$in: userIds}});
    }

    function updateUser(userId, user) {
        delete user._id;
        return MCUser.update({_id: userId}, {$set: user});
    }

    function deleteUser(userId) {
        return MCUser.remove({_id: userId});
    }

};