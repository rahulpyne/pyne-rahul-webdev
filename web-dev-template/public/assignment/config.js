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
            })
            .when("/user/:uid/website",{
                templateUrl: "website/templates/website-list.view.client.html",
                controller:"WebsiteListController",
                controllerAs:"model"
            })
            .when("/user/:uid/website/new",{ // This has to be above "/user/:uid/website/:wid" otherwise new will be considered as :wid
                templateUrl: "website/templates/website-new.view.client.html",
                controller:"WebsiteNewController",
                controllerAs:"model"
            })
            .when("/user/:uid/website/:wid",{
                templateUrl: "website/templates/website-edit.view.client.html",
                controller:"WebsiteEditController",
                controllerAs:"model"
            })
            .when("/user/:uid/website/:wid/page",{
                templateUrl:"page/templates/page-list.view.client.html",
                controller:"PageListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/new",{
                templateUrl:"page/templates/page-new.view.client.html",
                controller:"PageNewController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid",{
                templateUrl:"page/templates/page-edit.view.client.html",
                controller:"PageEditController",
                controllerAs:"model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget",{
            templateUrl:"widget/templates/widget-list.view.client.html",
            controller:"WidgetListController",
            controllerAs:"model"
        });
        // this helps us in setting the base href or the default page.
        //$locationProvider.html5Mode(true); // html5Mode - standardized way to manipulate the browser history using a script.
    }
})();