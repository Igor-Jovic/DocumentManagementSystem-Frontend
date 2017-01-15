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

        //
        // service.logout = function (callback) {
        //     $http.delete(API_URL + 'auth/logout')
        //         .then(function successCallback(response) {
        //             callback(response)
        //         }, function errorCallback(response) {
        //             console.log(response);
        //         });
        //
        // };
        //
        // service.register = function (registrationRequest, callback) {
        //     $http.post(API_URL + 'auth/registration', registrationRequest)
        //         .then(function successCallback(response) {
        //             callback(response)
        //         }, function errorCallback(response) {
        //             console.log(response);
        //         });
        //
        // };
        //
        // service.getCurrentUser = function (callback) {
        //     $http.get(API_URL + 'auth/user')
        //         .then(function successCallback(response) {
        //             callback(response)
        //         }, function errorCallback(response) {
        //             console.log(response);
        //         });
        // };

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

        return service;
    }
]);
