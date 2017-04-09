module.exports = function (database, passport) {

    var LocalStrategy = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    var bcrypt = require('bcrypt-nodejs');



    var mcGoogleConfig = {
        clientID     : process.env.MC_GOOGLE_CLIENT_ID,
        clientSecret : process.env.MC_GOOGLE_CLIENT_SECRET,
        callbackURL  : process.env.MC_GOOGLE_CALLBACK_URL
    };


    var mcFacebookConfig = {
        clientID: process.env.MC_FACEBOOK_CLIENT_ID,
        clientSecret: process.env.MC_FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.MC_FACEBOOK_CALLBACK_URL
    };

    var projectModel = database.mcmodels().userModel;

    passport.use('mc', new LocalStrategy(mcStrategy));
    passport.use('mcFacebook', new FacebookStrategy(mcFacebookConfig, mcFacebookStrategy));
    passport.use('mcGoogle',new GoogleStrategy(mcGoogleConfig,mcGoogleStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    var api = {
        getPassport: getPassport,
        getBCrypt: getBCrypt
    };
    return api;

    function mcStrategy(username, password, done) {
        projectModel
            .findUserByUsername(username)
            .then(function (user) {
                if (user && bcrypt.compareSync(password, user.password)) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            }, function (err) {
                if (err) {
                    return done(err);
                }
            });
    }

    function mcGoogleStrategy(token, refreshToken, profile, done){
        projectModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username:  emailParts[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            google: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return projectModel.createUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

    function mcFacebookStrategy(token, refreshToken, profile, done) {
        projectModel
            .findUserByFacebookId(profile.id)
            .then(function (user) {
                if (user) {
                    return done(null, user);
                } else {
                    var newUser = {
                        username: profile.displayName.replace(/ /g, ""),
                        facebook: {
                            token: token,
                            id: profile.id
                        }
                    };
                    projectModel
                        .createUser(newUser)
                        .then(function (user) {
                            return done(null, user);
                        }, function (err) {
                            console.log(err);
                            return done(err, null);
                        });
                }
            }, function (err) {
                console.log(err);
                return done(err, null);
            });
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
            projectModel
                .findUserById(user._id)
                .then(function (user) {
                    done(null, user);
                }, function (err) {
                    done(err, null);
                });
    }

    function getPassport() {
        return passport;
    }

    function getBCrypt() {
        return bcrypt;
    }

};