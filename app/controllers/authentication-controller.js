app.controller('AuthenticationController', ['$scope', '$rootScope', '$location', 'AuthenticationService',
    function ($scope, $rootScope, $location, AuthenticationService) {

        if ($rootScope.authenticatedUser) {
            $location.path("/main");
        }

        $scope.loginRequest = {
            username: "",
            password: ""
        };

        $scope.login = function () {
            AuthenticationService.login($scope.loginRequest, function (response) {
                $rootScope.authenticatedUser = response.data.content;
                $location.path("/main");
            });
        }
    }
]);
