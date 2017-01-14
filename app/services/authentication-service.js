app.factory('AuthenticationService', ['$http', '$rootScope', '$cookieStore', '$location', 'API_URL', 'TOKEN',
    function ($http, $rootScope, $cookieStore, $location, API_URL, TOKEN) {
        var service = {};

        service.login = function (loginRequest, callback) {
            $http.post(API_URL + 'auth/login', loginRequest)
                .then(function successCallback(response) {
                    $cookieStore.put(TOKEN, response.data.content.token);
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

        // service.createEvent = function (event, callback) {
        //     $http.post($rootScope.webApiPath + 'events/', {
        //         name: event.name,
        //         type: event.type,
        //         description: event.description
        //     }).success(
        //         function (response) {
        //             callback(response);
        //         });
        // };
        // service.getAllEvents = function (callback) {
        //     $http.get($rootScope.webApiPath + 'events', {})
        //         .success(
        //             function (response) {
        //                 callback(response);
        //             });
        // };
        // service.getEventById = function (id, callback) {
        //     $http.get($rootScope.webApiPath + 'events/' + id, {})
        //         .success(
        //             function (response) {
        //                 callback(response);
        //             });
        // };
        // service.updateEvent = function (id, event, callback) {
        //     console.log(event);
        //     $http.put($rootScope.webApiPath + 'events/' + id, {
        //         name: event.name,
        //         type: event.type,
        //         description: event.description
        //     }).success(
        //         function (response) {
        //             callback(response);
        //         });
        // };
        // service.deleteEvent = function (id, callback) {
        //     $http.delete($rootScope.webApiPath + 'events/' + id, {})
        //         .success(
        //             function (response) {
        //                 callback(response);
        //             });
        // };
        return service;
    }
]);
