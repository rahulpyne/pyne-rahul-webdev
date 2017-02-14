/**
 * Created by Rahulpyne on 14-Feb-17.
 */
(function () {
    angular
        .module("AppMaker")
        .config(configuration);

    function configuration($routeProvider,$locationProvider){// passing routeProvider, i.e. instance of ngRoute module.
        $routeProvider // maps the urls to views using when, cannot render multiple views in the same page like stateProvider.
            .when("/",{
                templateUrl: "user/templates/login.view.client.html",
                controller: "LoginController", // maps the controller from the pool loaded when index.html is rendered
                controllerAs: "model" // names the data model pertaining to this controller as 'model',it can be named anything else too.
                //model variable name would be used to access data in the view.
            })
            .when("/login",{
                templateUrl: "user/templates/login.view.client.html",
                controller: "LoginController", // maps the controller from the pool loaded when index.html is rendered
                controllerAs: "model" // names the data model pertaining to this controller as 'model',it can be named anything else too.
                //model variable name would be used to access data in the view.
            })
            .when("/register",{
                templateUrl: "user/templates/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/user/:uid",{
                templateUrl: "user/templates/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            });
        // this helps us in setting the base href or the default page.
        //$locationProvider.html5Mode(true); // html5Mode - standardized way to manipulate the browser history using a script.
    }
})();