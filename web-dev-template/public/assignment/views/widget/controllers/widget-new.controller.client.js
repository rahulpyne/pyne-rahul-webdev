(function (){
    angular
        .module("AppMaker")
        .controller("WidgetNewController",widgetNewController);

    function widgetNewController($routeParams,$location,WidgetService){
        var vm = this;
        vm.params={};
        vm.params.uid = $routeParams.uid;
        vm.params.wid = $routeParams.wid;
        vm.params.pid = $routeParams.pid;

        //event handlers
        vm.createWidget = createWidget;

        function init(){
            var promise = WidgetService.findAllAvailableTypes();
            promise.success(function(availableTypes){
                vm.availableTypes = availableTypes;
            });
        }init();


        function createWidget(widgetType){
            var widget= {// the page id could have been added here too, but the requirement was different, hence this.
                "widgetType":widgetType
            };
            var promise = WidgetService.createWidget(vm.params.pid,widget);
            promise.success(function(newWidget){
                $location.url("/user/"+vm.params.uid+"/website/"+vm.params.wid+"/page/"+vm.params.pid+"/widget/"+newWidget._id);
            });
        }
    }
})();