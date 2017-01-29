app.controller('DocTypeController', ['$scope', '$rootScope', 'DocTypeService', '$mdDialog',
    function ($scope, $rootScope, DocTypeService, $mdDialog) {

        $scope.selected = [];
        DocTypeService.getAll(function (response) {
            $scope.docs = response.data.content;
            transformDescriptors(response.data.content);
        });


        $scope.createDocType = function () {
            DocTypeService.create($scope.docTypeRequest, function (response) {
                $scope.docs.push(response.data.content);
                transformDescriptor(response.data.content);
            });
            $mdDialog.hide();
        };

        $scope.showCreateDocTypeDialog = function (ev) {
            $scope.docTypeRequest = {
                name: "",
                descriptors: []
            };

            $scope.passwordConfirmed = "";
            $mdDialog.show({
                contentElement: '#createDialog',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            });
        };

        var transformDescriptors = function (documents) {
            documents.map(function (document) {
                transformDescriptor(document);
                return document;
            });
        };

        var transformDescriptor = function (document) {
            document.descriptorsText = document.descriptors.map(function (desc) {
                return desc.name;
            }).join(", ");
        };



    }
])
;

