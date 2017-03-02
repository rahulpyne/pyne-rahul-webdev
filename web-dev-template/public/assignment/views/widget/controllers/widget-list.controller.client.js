/**
 * Created by Rahulpyne on 15-Feb-17.
 */
(function(){
    angular
        .module("AppMaker")
        .controller("WidgetListController",widgetListController);

    function widgetListController(WidgetService,$sce,$routeParams){
        var vm = this;
        vm.params = {};
        vm.params.uid = $routeParams.uid;
        vm.params.wid = $routeParams.wid;
        vm.params.pid = $routeParams.pid;

        //event handlers
        vm.doYouTrustUrl = doYouTrustUrl;
        vm.trustAsHtml = trustAsHtml;
        function init(){
            var promise = WidgetService.findWidgetsByPageId(vm.params.pid);
            promise.success(function(widgets){
                vm.widgets = widgets;
            });
        }init();

        function doYouTrustUrl(url) {
            var baseUrl = "https://www.youtube.com/embed/";
            var urlParts = url.split('/');
            var id = urlParts[urlParts.length - 1];
            baseUrl += id;
            return $sce.trustAsResourceUrl(baseUrl); // ----> --->  $sce.trustAs($sce.RESOURCEURL,text)
        }
        function trustAsHtml(text){
            return $sce.trustAsHtml(text); // --->  $sce.trustAs($sce.HTML,text)
        }

        function updateIndexPosition(initial,final){
            WidgetService
                .updatePosition(initial,final,vm.params.pid)
                .success(function (widgets) {
                });
        }
    }
})();