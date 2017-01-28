app.directive('treeDirective', function () {

    return {
        restrict: 'E',
        scope: {
            processes: '='
        },
        templateUrl: 'app/directives/tree-directive/tree.html'
    };
});