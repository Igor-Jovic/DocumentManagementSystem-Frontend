var app = angular.module("App", ['ngRoute', 'ngMaterial', 'ngAnimate', 'ngAria', 'ngCookies', 'mdDataTable']);

app.constant("API_URL", "/");
app.constant("TOKEN", "DMS_TOKEN");

app.config(['$routeProvider', '$httpProvider', '$mdThemingProvider', '$mdIconProvider',
    function ($routeProvider, $httpProvider, $mdThemingProvider, $mdIconProvider) {
        $routeProvider.when('/main', {
            templateUrl: 'app/partials/main.html',
            controller: 'MainController'
        }).when('/authentication', {
            templateUrl: 'app/partials/auth.html',
            controller: 'AuthenticationController'
        }).when('/users', {
            templateUrl: 'app/partials/users.html',
            controller: 'UsersController'
        }).when('/documenttype', {
            templateUrl: 'app/partials/documenttype.html',
            controller: 'DocTypeController'
        }).when('/about', {
            templateUrl: 'app/partials/about.html'
        }).otherwise({
            redirectTo: '/main'
        });

        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('deep-orange')
            .warnPalette('red');

        $httpProvider.interceptors.push('APIInterceptor');
    }
])
;

app.run(['$rootScope', '$http', '$location', '$cookieStore', 'TOKEN', 'AuthenticationService', function ($rootScope, $http, $location, $cookieStore, TOKEN, AuthenticationService) {

    var loginAfterRefresh = function () {
        $http.defaults.headers.common["X-Authorization"] = $cookieStore.get(TOKEN);
        AuthenticationService.getCurrentUser(function (response) {
            $rootScope.authenticatedUser = response.data.content;
        });
    };
    if ($cookieStore.get(TOKEN)) {
        loginAfterRefresh();
    }

    $rootScope.$on('$locationChangeStart', function (event) {
        if (!$rootScope.authenticatedUser) {
            $location.path("/authentication");
        }
    });

    $rootScope.logout = function () {
        $rootScope.authenticatedUser = undefined;
        AuthenticationService.logout(function (response) {
            console.log(response)
        })
    };
}]);

app.controller('AppController', ['$rootScope', '$mdToast', function ($rootScope, $mdToast) {

    $rootScope.showToast = function (message) {
        var toast = $mdToast
            .simple()
            .action('CLOSE')
            .highlightAction(true)
            .highlightClass('md-accent')
            .position("bottom left")
            .hideDelay(5000)
            .content(message);
        $mdToast.show(toast);
    };

}]);
