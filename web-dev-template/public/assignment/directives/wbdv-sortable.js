(function () {
    angular
        .module('AppMaker')
        .directive('wbdvSortable', sortableDir);

    function sortableDir() {
        function linkFunc(scope, element, attributes, sortController) {
            element.sortable({
                start: function (event, ui) {
                    ui.item.startPos = ui.item.index();
                },
                update: function (event, ui) {
                    var startIndex = ui.item.startPos;
                    var endIndex = ui.item.index();
                    sortController.sortWidgets(startIndex, endIndex);
                },
                axis: 'y',
                cursor: 'move'
            });
        }

        return { link: linkFunc, controller: sortController }
    }

    function sortController(WidgetService, $routeParams) {
        var vm = this;
        vm.sortWidgets = sortWidgets;

        function sortWidgets(startIndex, endIndex) {
            var pageId = $routeParams.pid;
            WidgetService.updateWidgetOrder(startIndex, endIndex,pageId)
                .success(function (response) {
                })
                .error(function () {
                });
        }
    }
})();