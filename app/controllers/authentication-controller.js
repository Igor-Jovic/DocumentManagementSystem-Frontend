app.controller('AuthenticationController', ['$scope', '$rootScope', 'AuthenticationService', '$mdToast', function ($scope, $rootScope, AuthenticationService, $mdToast) {

    $scope.loginRequest = {
        username: "",
        password: ""
    };

    $scope.login = function () {
        AuthenticationService.login($scope.loginRequest)
            .then(function successCallback(response) {
                $rootScope.loggedIn = response.data.success;
            }, function errorCallback(response) {
                console.log(response);
            });
    }
}
]);
