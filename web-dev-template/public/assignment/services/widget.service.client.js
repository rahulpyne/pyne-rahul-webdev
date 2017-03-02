/**
 * Created by Rahulpyne on 15-Feb-17.
 */
(function(){
    angular
        .module("AppMaker")
        .factory("WidgetService",widgetService);

    function widgetService($http){

        var api = {
            "createWidget":createWidget,
            "findWidgetsByPageId":findWidgetsByPageId,
            "findWidgetById":findWidgetById,
            "updateWidget":updateWidget,
            "deleteWidget":deleteWidget,
            "findAllAvailableTypes":findAllAvailableTypes,
            "updatePosition": updatePosition
        };
        return api;

        function updatePosition(initial,final,pageId){
            return $http.put("/page/"+pageId+"/widget?initial="+initial+"&final="+final);
        }

        function findAllAvailableTypes(){
            return $http.get("/api/widgetavailableTypes");
        }

        function createWidget(pageId, widget){
            return $http.post("/api/page/"+pageId+"/widget",widget);
        }

        function findWidgetsByPageId(pageId){
            return $http.get("/api/page/"+pageId+"/widget");
        }

        function findWidgetById(widgetId){
            return $http.get("/api/widget/"+widgetId);
        }

        function updateWidget(widgetId, widget) {
            return $http.put("/api/widget/"+widgetId,widget);
        }

        function deleteWidget(widgetId){
            return $http.delete("/api/widget/"+widgetId);
        }
    }
})();