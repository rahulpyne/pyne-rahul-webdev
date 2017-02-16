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
            vm.widget = WidgetService.findWidgetById(vm.params.widg);
        }init();

        function updateWidget(){
            var bool = WidgetService.updateWidget(vm.params.widg,vm.widget);
            if(bool){
                $location.url("/user/"+vm.params.uid+"/website/"+vm.params.wid+"/page/"+vm.params.pid+"/widget")
            }
            else{
                vm.error = "Encountered a problem. Kindly try again";
            }
        }

        function deleteWidget(){
            var bool = WidgetService.deleteWidget(vm.params.widg);
            if(bool){
                $location.url("/user/"+vm.params.uid+"/website/"+vm.params.wid+"/page/"+vm.params.pid+"/widget")
            }
            else{
                vm.error = "Encountered a problem. Kindly try again";
            }
        }
    }
})();