app.factory('TreeService', ['$http', '$rootScope', 'API_URL',
    function ($http, $rootScope, API_URL) {
        var service = {};

        service.getProcessTree = function (callback) {
            $http.get(API_URL + 'tree')
                .then(function successCallback(response) {
                    callback(response)
                }, function errorCallback(response) {
                    console.log(response);
                });
        };
        return service;
    }
]);
