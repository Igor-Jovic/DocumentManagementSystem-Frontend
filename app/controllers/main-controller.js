app.controller('MainController', ['$scope', '$rootScope', 'TreeService', function ($scope, $rootScope, TreeService) {

    TreeService.getProcessTree(function (response) {
        $scope.processes = response.data.content;
        console.log(response)
    });


}]);

