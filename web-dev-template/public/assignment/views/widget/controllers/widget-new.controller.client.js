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
            vm.widgets = WidgetService.findAllWidgets();
            vm.availableTypes = WidgetService.findAllAvailableTypes();
        }init();


        function createWidget(widgetType){
            var widget= {// the page id could have been added here too, but the requirement was different, hence this.
                "widgetType":widgetType
            };
            if(vm.widgets){
                widget._id = vm.widgets[vm.widgets.length - 1]._id+1;
            }
            else{
                widget._id = 1;
            }
            WidgetService.createWidget(vm.params.pid,widget);
            $location.url("/user/"+vm.params.uid+"/website/"+vm.params.wid+"/page/"+vm.params.pid+"/widget/"+widget._id);
        }
    }
})();