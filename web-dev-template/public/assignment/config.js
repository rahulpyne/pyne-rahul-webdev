/**
 * Created by Rahulpyne on 14-Feb-17.
 */
(function () {
    angular
        .module("AppMaker")
        .config(configuration);

    function configuration($routeProvider,$httpProvider){// passing routeProvider, i.e. instance of ngRoute module.

        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';

        $routeProvider // maps the urls to views using when, cannot render multiple views in the same page like stateProvider.
            .when("/",{
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "LoginController", // maps the controller from the pool loaded when index.html is rendered
                controllerAs: "model" // names the data model pertaining to this controller as 'model',it can be named anything else too.
                //model variable name would be used to access data in the view.
            })
            .when("/login",{
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "LoginController", // maps the controller from the pool loaded when index.html is rendered
                controllerAs: "model" // names the data model pertaining to this controller as 'model',it can be named anything else too.
                //model variable name would be used to access data in the view.
            })
            .when("/register",{
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/user/:uid",{
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/user/:uid/website",{
                templateUrl: "views/website/templates/website-list.view.client.html",
                controller:"WebsiteListController",
                controllerAs:"model"
            })
            .when("/user/:uid/website/new",{ // This has to be above "/user/:uid/website/:wid" otherwise new will be considered as :wid
                templateUrl: "views/website/templates/website-new.view.client.html",
                controller:"WebsiteNewController",
                controllerAs:"model"
            })
            .when("/user/:uid/website/:wid",{
                templateUrl: "views/website/templates/website-edit.view.client.html",
                controller:"WebsiteEditController",
                controllerAs:"model"
            })
            .when("/user/:uid/website/:wid/page",{
                templateUrl:"views/page/templates/page-list.view.client.html",
                controller:"PageListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/new",{
                templateUrl:"views/page/templates/page-new.view.client.html",
                controller:"PageNewController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid",{
                templateUrl:"views/page/templates/page-edit.view.client.html",
                controller:"PageEditController",
                controllerAs:"model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget",{
                templateUrl:"views/widget/templates/widget-list.view.client.html",
                controller:"WidgetListController",
                controllerAs:"model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/new",{
                templateUrl:"views/widget/templates/widget-chooser.view.client.html",
                controller:"WidgetNewController",
                controllerAs:"model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:widg",{
                templateUrl:"views/widget/templates/widget-edit.view.client.html",
                controller:"WidgetEditController",
                controllerAs:"model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:widg/flickr", {
                templateUrl: "views/widget/templates/widget-flickr.search.client.html",
                controller: "FlickrImageSearchController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: '/'
            });
        // this helps us in setting the base href or the default page.
        //$locationProvider.html5Mode(true); // html5Mode - standardized way to manipulate the browser history using a script.
    }
})();