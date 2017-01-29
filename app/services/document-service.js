app.factory('DocumentService', ['$http', '$rootScope', 'API_URL',
    function ($http, $rootScope, API_URL) {
        var service = {};

        service.getAll = function (callback) {
            $http.get(API_URL + 'documents')
                .then(function successCallback(response) {
                    callback(response)
                }, function errorCallback(response) {
                    console.log(response);
                });
        };

        service.getAllForActivity = function (id, callback) {
            $http.get(API_URL + 'documents/activities/' + id)
                .then(function successCallback(response) {
                    callback(response)
                }, function errorCallback(response) {
                    console.log(response);
                });
        };

        service.getOne = function (id, callback) {
            $http.get(API_URL + 'documents/' + id)
                .then(function successCallback(response) {
                    callback(response)
                }, function errorCallback(response) {
                    console.log(response);
                });
        };

        service.create = function (docRequest, callback) {
            $http.post(API_URL + "documents", docRequest)
                .then(function successCallback(response) {
                    callback(response)
                }, function errorCallback(response) {
                    console.log(response);
                });
        };

        return service;
    }
]);