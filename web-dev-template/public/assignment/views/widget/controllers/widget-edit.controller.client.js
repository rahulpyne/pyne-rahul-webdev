/**
 * Created by Rahulpyne on 15-Feb-17.
 */
(function(){
    angular
        .module("AppMaker")
        .controller("WidgetEditController",widgetEditController);

    function widgetEditController(WidgetService, $routeParams, $location){
        var vm = this;
        vm.params = {};
        vm.params.uid = $routeParams.uid;
        vm.params.wid = $routeParams.wid;
        vm.params.pid = $routeParams.pid;
        vm.params.widg = $routeParams.widg;

        //event handlers
        vm.updateWidget =updateWidget;
        vm.deleteWidget = deleteWidget;

        function init(){
            var promise = WidgetService.findWidgetById(vm.params.widg);
            promise.success(function(widget){
                vm.widget = widget;
            });
        }init();

        function updateWidget(){
            var promise = WidgetService.updateWidget(vm.params.widg,vm.widget);
            promise.success(function(widget){
                $location.url("/user/"+vm.params.uid+"/website/"+vm.params.wid+"/page/"+vm.params.pid+"/widget")
            })
                .error(function(){
                    vm.error = "Encountered a problem. Kindly try again";
                });
        }

        function deleteWidget(){
            var promise = WidgetService.deleteWidget(vm.params.widg);
            promise.success(function(){
                $location.url("/user/"+vm.params.uid+"/website/"+vm.params.wid+"/page/"+vm.params.pid+"/widget")
            })
                .error(function(){
                    vm.error = "Encountered a problem. Kindly try again";
                });
        }
    }
})();