app.directive('treeDirective', function () {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'app/directives/tree-directive/tree.html',
        controller: ['$scope', '$mdDialog', 'ProcessService', 'TreeService',
            function TreeController($scope, $mdDialog, ProcessService, TreeService) {
                var loadTree = function () {
                    TreeService.getProcessTree(function (response) {
                        $scope.processes = response.data.content;
                    });
                };

                loadTree();

                $scope.createNewProcess = function (ev) {
                    // Appending dialog to document.body to cover sidenav in docs app
                    var confirm = newProcessPrompt(ev);

                    $mdDialog.show(confirm).then(function (processName) {
                        ProcessService.createMainProcess(processName, function () {
                            loadTree();
                        })
                    }, function () {
                    });
                };

                function newProcessPrompt(ev) {
                    var confirm = $mdDialog.prompt()
                        .title('Enter process name')
                        .placeholder('Process name')
                        .targetEvent(ev)
                        .ok('Create')
                        .cancel('Cancel');
                    return confirm;
                }
            }]
    }

});