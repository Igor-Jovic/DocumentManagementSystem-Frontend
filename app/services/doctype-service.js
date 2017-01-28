app.factory('DocTypeService', ['$http', '$rootScope', 'API_URL',
    function ($http, $rootScope, API_URL) {
        var service = {};

        service.getAll = function (callback) {
            $http.get(API_URL + 'documenttypes')
                .then(function successCallback(response) {
                    callback(response)
                }, function errorCallback(response) {
                    console.log(response);
                });
        };

        service.create = function (docTypeRequest, callback) {
            $http.post(API_URL + "documenttypes", docTypeRequest)
                .then(function successCallback(response) {
                    callback(response)
                }, function errorCallback(response) {
                    console.log(response);
                });
        };
        
        return service;
    }
]);
