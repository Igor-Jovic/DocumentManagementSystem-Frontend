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
                    var confirm = newProcessPrompt(ev, "Enter process name");

                    $mdDialog.show(confirm)
                        .then(function (processName) {
                            ProcessService.createMainProcess(processName, function () {
                                loadTree();
                            })
                        }, function () {
                        });
                };

                $scope.createNewSubprocess = function (ev, parentProcessId) {
                    var confirm = newProcessPrompt(ev, "Enter subprocess name");

                    $mdDialog.show(confirm)
                        .then(function (processName) {
                            console.log(parentProcessId);
                            ProcessService.createSubprocess(processName, parentProcessId, function () {
                                loadTree();
                            })
                        }, function () {
                        });
                };

                $scope.createNewPrimitiveProcess = function (ev, parentProcessId) {
                    var confirm = newProcessPrompt(ev, "Enter primitive process name");

                    $mdDialog.show(confirm)
                        .then(function (processName) {
                            console.log(parentProcessId);
                            ProcessService.createPrimitiveProcess(processName, parentProcessId, function () {
                                loadTree();
                            })
                        }, function () {
                        });
                };

                function newProcessPrompt(ev, title) {
                    return $mdDialog.prompt()
                        .title(title)
                        .placeholder('Process name')
                        .targetEvent(ev)
                        .ok('Create')
                        .cancel('Cancel');
                }
            }]
    }

});