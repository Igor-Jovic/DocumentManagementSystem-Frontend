app.controller('MainController', ['$scope', '$rootScope', 'TreeService', 'ProcessService', function ($scope, $rootScope, TreeService, ProcessService) {

    var loadTree = function () {
        TreeService.getProcessTree(function (response) {
            $scope.processes = response.data.content;
            console.log(response)
        });
    };

    loadTree();


}]);

