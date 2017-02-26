app.factory('UserService', ['$http', '$rootScope', 'API_URL',
    function ($http, $rootScope, API_URL) {
        var service = {};

        service.getAllUsers = function (callback) {
            $http.get(API_URL + 'users')
                .then(function successCallback(response) {
                    callback(response)
                }, function errorCallback(response) {
                    console.log(response);
                });
        };

        service.deleteUser = function (id, callback) {
            $http.delete(API_URL + "/" + id, {})
                .then(function successCallback(response) {
                    callback(response)
                }, function errorCallback(response) {
                    console.log(response);
                });
        };

        service.createUser = function (userRequest, callback) {
            $http.post(API_URL + "users", userRequest)
                .then(function successCallback(response) {
                    callback(response)
                }, function errorCallback(response) {
                    console.log(response);
                });
        };

        return service;
    }
]);
