app.controller('AuthenticationController', ['$scope', '$rootScope', '$location', 'AuthenticationService',
    function ($scope, $rootScope, $location, AuthenticationService) {

        if ($rootScope.authenticatedUser) {
            $location.path("/main");
        }

        $scope.loginRequest = {
            username: "",
            password: ""
        };

        $scope.registrationRequest = {
            username: "",
            password: "",
            companyName: ""
        };

        $scope.passwordConfirmed = "";

        $scope.login = function () {
            AuthenticationService.login($scope.loginRequest, function (response) {
                $rootScope.authenticatedUser = response.data.content;
                $location.path("/main");
            });
        };

        $scope.register = function () {
            if ($scope.passwordConfirmed != $scope.registrationRequest.password) {
                $rootScope.showToast("Passwords do not match")
                return;
            }
            AuthenticationService.register($scope.registrationRequest, function (response) {
                //$rootScope.showToast(response.data.content.message);
            });
        }
    }
]);
