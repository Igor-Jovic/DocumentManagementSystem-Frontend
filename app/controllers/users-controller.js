app.controller('UsersController', ['$scope', '$rootScope', 'UserService',
    function ($scope, $rootScope, UserService) {

        $scope.users = [];
        UserService.getAllUsers(function (response) {
            $scope.users = response.data.content;
            console.log($scope.users);
        })

    }]);

