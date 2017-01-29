app.controller('UsersController', ['$scope', '$rootScope', 'UserService', '$mdDialog',
    function ($scope, $rootScope, UserService, $mdDialog) {

        $scope.selected = [];
        UserService.getAllUsers(function (response) {
            $scope.users = response.data.content;
        });


        $scope.createUser = function () {
            if ($scope.passwordConfirmed != $scope.userRequest.password) {
                $rootScope.showToast("Passwords do not match")
                return;
            }
            UserService.createUser($scope.userRequest, function (response) {
                $scope.users.push(response.data.content);
            });
            $mdDialog.hide();
        };

        $scope.showCreateUserDialog = function (ev) {
            $scope.userRequest = {
                username: "",
                password: "",
                role: ""
            };

            $scope.passwordConfirmed = "";
            $mdDialog.show({
                // controller: DialogController,
                contentElement: '#createUserDialog',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            });
        };

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

    }
])
;

