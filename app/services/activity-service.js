app.factory('ActivityService', ['$http', '$rootScope', 'API_URL',
    function ($http, $rootScope, API_URL) {
        var service = {};

        service.create = function (activityRequest, callback) {
            $http.post(API_URL + "activities", activityRequest)
                .then(function successCallback(response) {
                    callback(response)
                }, function errorCallback(response) {
                    console.log(response);
                });
        };

        return service;
    }
]);
