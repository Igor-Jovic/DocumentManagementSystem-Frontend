app.controller('AuthenticationController', ['$scope', '$rootScope', 'AuthenticationService', function ($scope, $rootScope, AuthenticationService) {

    $scope.loginRequest = {
        username: "",
        password: ""
    };

    $scope.login = function () {
        AuthenticationService.login($scope.loginRequest)
            .then(function successCallback(response) {
                console.log(response);
                console.log("pozz")
            }, function errorCallback(response) {
                console.log("bad");
                console.log(response);
            });
    }
}
]);
