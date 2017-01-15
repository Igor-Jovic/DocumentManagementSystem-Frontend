app.controller('UsersController', ['$scope', '$rootScope', 'UserService',
    function ($scope, $rootScope, UserService) {

        $scope.selected = [];
        // UserService.getAllUsers(function (response) {
        //     $scope.users = response.data.content;
        //     console.log($scope.users);
        // });
       

        $scope.users = [
            {
                id: 601,
                username: 'User 1',
                role: 'ADMIN'
            }, {
                id: 602,
                username: 'User 2',
                role: 'USER'
            }, {
                id: 603,
                username: 'User 3',
                role: 'ADMIN'
            }, {
                id: 604,
                username: 'User 4',
                role: 'USER'
            }, {
                id: 605,
                username: 'User 10',
                role: 'ADMIN'
            }, {
                id: 605,
                username: 'User 0',
                role: 'USER'
            }, {
                id: 607,
                username: 'User 2',
                role: 'ADMIN',
            }, {
                id: 608,
                username: 'User 1',
                role: 'ADMIN'
            }, {
                id: 609,
                username: 'User 2',
                role: 'USER'
            }, {
                id: 610,
                username: 'User 3',
                role: 'USER'
            }];

    }]);

