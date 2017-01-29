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

                $scope.inputType = {};
                $scope.outputType= {};
                $scope.inputDocuments = null;
                $scope.outputDocuments = null;
                $scope.selectedActivity = null;

                $scope.getDescriptorsForActivity = function (ev, activity) {
                    $scope.selectedActivity = activity;
                    DocTypeService.getOne(activity.inputDocumentType.id, function (response) {
                        $scope.inputType = response.data.content;
                    });

                    DocTypeService.getOne(activity.outputDocumentType.id, function (response) {
                        $scope.outputType = response.data.content;
                    });
                };

                $scope.getDocumentsForActivity = function (ev, activity) {
                    DocumentService.getAllForActivity(activity.id, function (response) {
                        $scope.inputDocuments = response.data.content.inputs;
                        $scope.outputDocuments = response.data.content.outputs;
                    });
                };
                
                $scope.createDocuments = function (ev, input, output) {
                    var inputRequest = input;
                    inputRequest.descriptors = inputRequest.descriptors.map(function (e) {
                        delete e[name];
                        return e;
                    });
                    inputRequest.activityId = $scope.selectedActivity.id;
                    inputRequest.input = true;
                    var outputRequest = output;
                    outputRequest.descriptors = outputRequest.descriptors.map(function (e) {
                        delete e[name];
                        return e;
                    });
                    outputRequest.activityId = $scope.selectedActivity.id;
                    outputRequest.input = false;
                    DocumentService.create(inputRequest, function (response) {
                        console.log("Input created", response.data.content);
                        $scope.inputType = {};
                    });

                    DocumentService.create(outputRequest, function (response) {
                        console.log("Output created", response.data.content);
                        $scope.outputType= {};
                    });

                    $scope.selectedActivity = null;
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