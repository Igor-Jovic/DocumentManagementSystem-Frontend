app.factory('APIInterceptor', ['$rootScope', '$q', '$location', function ($rootScope, $q, $location) {
    var interceptor = {
        responseError: function (response) {
            if (response.status == 401 || response.status == 403) {
                $location.path("/main");
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