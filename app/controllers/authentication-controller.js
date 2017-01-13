app.controller('AuthenticationController', ['$scope', '$rootScope', '$http', '$cookieStore', '$location', 'AuthenticationService', 'TOKEN',
    function ($scope, $rootScope, $http, $cookieStore, $location, AuthenticationService, TOKEN) {

        if ($rootScope.authenticatedUser) {
            $location.path("/main");
        }

        $scope.loginRequest = {
            username: "",
            password: ""
        };

        $scope.login = function () {
            AuthenticationService.login($scope.loginRequest)
                .then(function successCallback(response) {
                    $rootScope.authenticatedUser = response.data.content;
                    $cookieStore.put(TOKEN, $rootScope.authenticatedUser.token);
                    $location.path("/main");
                }, function errorCallback(response) {
                    console.log(response);
                });
        }
    }
]);
