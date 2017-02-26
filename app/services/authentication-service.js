app.factory('AuthenticationService', ['$http', '$rootScope', '$cookieStore', '$location', 'API_URL', 'TOKEN',
    function ($http, $rootScope, $cookieStore, $location, API_URL, TOKEN) {
        var service = {};

        service.login = function (loginRequest, callback) {
            $http.post(API_URL + 'auth/login', loginRequest)
                .then(function successCallback(response) {
                    $cookieStore.put(TOKEN, response.data.content.token);
                    $http.defaults.headers.common["X-Authorization"] = $cookieStore.get(TOKEN);
                    callback(response)
                }, function errorCallback(response) {
                    console.log(response);
                });

        };
        service.logout = function (callback) {
            $http.delete(API_URL + 'auth/logout')
                .then(function successCallback(response) {
                    callback(response)
                }, function errorCallback(response) {
                    console.log(response);
                });

        };

        service.register = function (registrationRequest, callback) {
            $http.post(API_URL + 'auth/registration', registrationRequest)
                .then(function successCallback(response) {
                    callback(response)
                }, function errorCallback(response) {
                    console.log(response);
                });

        };

        service.getCurrentUser = function (callback) {
            $http.get(API_URL + 'auth/user')
                .then(function successCallback(response) {
                    callback(response)
                }, function errorCallback(response) {
                    console.log(response);
                });
        };
        return service;
    }
]);
