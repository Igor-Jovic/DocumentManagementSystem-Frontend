app.factory('APIInterceptor', ['$rootScope', '$q', '$location', '$cookieStore', 'TOKEN',
    function ($rootScope, $q, $location, $cookieStore, TOKEN) {
        var interceptor = {
            responseError: function (response) {
                if (response.status == 401 || response.status == 403) {
                    //if they try to hack log them out
                    $rootScope.authenticatedUser = undefined;
                    $cookieStore.remove(TOKEN);
                    $location.path("/authentication");
                }
                $rootScope.showToast(response.data.errorMessage)
                return $q.reject(response);
            },
            response: function (response) {
                return response;
            }
        };
        return interceptor;
    }]);