app.factory('ProcessService', ['$http', '$rootScope', 'API_URL',
    function ($http, $rootScope, API_URL) {
        var service = {};

        service.createMainProcess = function (processName, callback) {
            $http.post(API_URL + "processes", {
                'name': processName,
                'primitive': false,
                'parentProcess': null
            })
                .then(function successCallback(response) {
                    callback(response)
                }, function errorCallback(response) {
                    console.log(response);
                });
        };

        service.createSubprocess = function (processName, parentProcessId, callback) {
            $http.post(API_URL + "processes", {
                'name': processName,
                'primitive': false,
                'parentProcess': parentProcessId
            })
                .then(function successCallback(response) {
                    callback(response)
                }, function errorCallback(response) {
                    console.log(response);
                });
        };

        service.createPrimitiveProcess = function (processName, parentProcessId, callback) {
            $http.post(API_URL + "processes", {
                'name': processName,
                'primitive': true,
                'parentProcess': parentProcessId
            })
                .then(function successCallback(response) {
                    callback(response)
                }, function errorCallback(response) {
                    console.log(response);
                });
        };
        return service;
    }
]);
