/**
 * Created by Rahulpyne on 15-Feb-17.
 */
(function(){
    angular
        .module("AppMaker")
        .factory("WidgetService",widgetService);

    function widgetService(){
        var widgets = [];
        var availableTypes = [];

        function init(){
            widgets =[
                { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
                { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                    "url": "http://lorempixel.com/400/200/"},
                { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
                { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                    "url": "https://youtu.be/AM2Ivdi9c4E" },
                { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
            ];
            availableTypes = ["HEADING","HTML","IMAGE","YOUTUBE"];
        } init();

        var api = {
            "createWidget":createWidget,
            "findWidgetsByPageId":findWidgetsByPageId,
            "findWidgetById":findWidgetById,
            "updateWidget":updateWidget,
            "deleteWidget":deleteWidget,
            "findAllWidgets":findAllWidgets,
            "findAllAvailableTypes":findAllAvailableTypes
        };
        return api;

        function findAllAvailableTypes(){
            return angular.copy(availableTypes)
        }

        function findAllWidgets(){
            return angular.copy(widgets);
        }
        function createWidget(pageId, widget){
            var newWidget = angular.copy(widget);
            newWidget.pageId = pageId;
            widgets.push(newWidget);
        }

        function findWidgetsByPageId(pageId){
            var pageWidgets  = [];
            for(var w in widgets){
                if(widgets[w].pageId == pageId){
                    pageWidgets.push(angular.copy(widgets[w]));
                }
            }
            return pageWidgets;
        }

        function findWidgetById(widgetId){
            for(var w in widgets){
                if(widgets[w]._id == widgetId){
                    return angular.copy(widgets[w]);
                }
            }
            return null;
        }

        function updateWidget(widgetId, widget) {
            for (var w in widgets) {
                if (widgets[w]._id == widgetId) {
                    widgets[w] = widget;
                    return widgets[w];
                }
            }
            return null;
        }

        function deleteWidget(widgetId){
            for (var w in widgets) {
                if (widgets[w]._id == widgetId) {
                    widgets.splice(w,1);
                    return true;
                }
            }
            return false;
        }
    }
})();