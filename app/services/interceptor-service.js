app.factory('APIInterceptor', ['$rootScope', '$q', function ($rootScope, $q) {
    var interceptor = {
        responseError: function (response) {
            $rootScope.showToast(response.data.errorMessage)
            return $q.reject(response);
        },
        response: function (response) {
            return response;
        }
    };
    return interceptor;
}]);