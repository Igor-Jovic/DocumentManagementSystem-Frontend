app.directive('treeDirective', function () {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'app/directives/tree-directive/tree.html',
        controller: ['$rootScope', '$scope', '$mdDialog', 'ProcessService', 'TreeService', 'DocTypeService', 'ActivityService',
            function TreeController($rootScope, $scope, $mdDialog, ProcessService, TreeService, DocTypeService, ActivityService) {
                var loadTree = function () {
                    TreeService.getProcessTree(function (response) {
                        $scope.processes = response.data.content;
                    });
                };

                loadTree();

                DocTypeService.getAll(function (response) {
                    $scope.documentTypes = response.data.content;
                    console.log($scope.documentTypes);
                });

                $scope.showCreateActivityDialog = function (ev, parentProcessId) {
                    $scope.activityRequest = {
                        name: "",
                        parentProcessId: parentProcessId,
                        inputDocumentTypeId: "",
                        outputDocumentTypeId: ""
                    };

                    $mdDialog.show({
                        contentElement: '#createActivityDialog',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: true
                    });
                };

                $scope.createActivity = function () {
                    console.log("creating activity");
                    console.log($scope.activityRequest);
                    ActivityService.create($scope.activityRequest, function (response) {
                        $rootScope.showToast("Successfully created activity" + response.data.content.activityName);
                        loadTree();
                    })
                };

                $scope.createNewProcess = function (ev) {
                    var confirm = newProcessPrompt(ev, "Enter process name");

                    $mdDialog.show(confirm)
                        .then(function (processName) {
                            ProcessService.createMainProcess(processName, function () {
                                $rootScope.showToast("Successfully created process " + processName);
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
                                $rootScope.showToast("Successfully created process " + processName);
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
                                $rootScope.showToast("Successfully created process " + processName);
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