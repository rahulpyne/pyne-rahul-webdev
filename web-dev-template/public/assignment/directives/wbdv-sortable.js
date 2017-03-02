(function () {
    angular
        .module('AppMaker')
        .directive('wbdvSortable', sortableDir);

    function sortableDir($http) {
        function linkFunc(scope, element, attributes) {
            var startIndex = -1;
            var endIndex = -1;
            element.sortable({
                axis: 'y',
                start: function(event,ui){
                    startIndex=ui.item.index();
                },
                stop : function (event,ui) {
                    endIndex = ui.item.index();
                    if (startIndex != endIndex) {
                        scope.model.updateIndexPosition(startIndex, endIndex);
                    }
                }
            });
        }
        return {
            link: linkFunc
        };

    }
})();