app.directive('treeDirective', function () {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'app/directives/tree-directive/tree.html',
        controller: ['$rootScope', '$scope', '$mdDialog', 'ProcessService', 'TreeService', 'DocTypeService', 'ActivityService', 'DocumentService',
            function TreeController($rootScope, $scope, $mdDialog, ProcessService, TreeService, DocTypeService, ActivityService, DocumentService) {
                var loadTree = function () {
                    TreeService.getProcessTree(function (response) {
                        $scope.processes = response.data.content;
                    });
                };

                loadTree();

                DocTypeService.getAll(function (response) {
                    $scope.documentTypes = response.data.content;
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
                    ActivityService.create($scope.activityRequest, function (response) {
                        $rootScope.showToast("Successfully created activity" + response.data.content.activityName);
                        loadTree();
                    });
                    $mdDialog.hide();
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
                            ProcessService.createPrimitiveProcess(processName, parentProcessId, function () {
                                $rootScope.showToast("Successfully created process " + processName);
                                loadTree();
                            })
                        }, function () {
                        });
                };

                $scope.inputDocuments = null;
                $scope.outputDocuments = null;

                function getDescriptorsForActivity(activity) {
                    DocTypeService.getOne(activity.inputDocumentType.id, function (response) {
                        $scope.inputType = response.data.content;
                    });
                    DocTypeService.getOne(activity.outputDocumentType.id, function (response) {
                        $scope.outputType = response.data.content;
                        $scope.selectedActivity.outputDescriptors = $scope.outputType.descriptors;
                    });
                }

                $scope.openCreateDocumentsDialog = function (ev, activity) {
                    $scope.selectedActivity = activity;
                    getDescriptorsForActivity(activity);
                    $mdDialog.show({
                        contentElement: '#createDocumentsDialog',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: true
                    });
                };

                $scope.getDocumentsForActivity = function (activity) {
                    $scope.selectedActivity = activity;
                    getDescriptorsForActivity(activity);
                    DocumentService.getAllForActivity(activity.id, function (response) {
                        $scope.inputDocuments = response.data.content.inputs;
                        $scope.outputDocuments = response.data.content.outputs;
                        console.log(response.data.content);
                    });
                };

                $scope.createDocuments = function () {
                    var inputRequest = $scope.inputType;
                    inputRequest.descriptors = $scope.inputType.descriptors.map(function (e) {
                        delete e[name];
                        return e;
                    });
                    inputRequest.activityId = $scope.selectedActivity.id;
                    inputRequest.input = true;
                    var outputRequest = $scope.outputType;
                    outputRequest.descriptors = $scope.outputType.descriptors.map(function (e) {
                        delete e[name];
                        return e;
                    });
                    outputRequest.activityId = $scope.selectedActivity.id;
                    outputRequest.input = false;
                    DocumentService.create(inputRequest, function (response) {
                        console.log("Input created", response.data.content);
                        $scope.inputDocuments.push(response.data.content)
                    });

                    DocumentService.create(outputRequest, function (response) {
                        console.log("Output created", response.data.content);
                        $scope.outputDocuments.push(response.data.content)
                    });
                    $mdDialog.hide();
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