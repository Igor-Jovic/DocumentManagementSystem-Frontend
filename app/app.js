var app = angular.module("App", ['ngRoute', 'ngMaterial', 'ngAnimate', 'ngAria']);

app.constant("API_URL", "/dms/");

app.config(['$routeProvider', '$httpProvider', '$mdThemingProvider', '$mdIconProvider',
    function ($routeProvider, $httpProvider, $mdThemingProvider, $mdIconProvider) {
        $routeProvider.when('/main', {
            templateUrl: 'app/partials/main.html',
            controller: 'MainController'
        }).when('/authentication', {
            templateUrl: 'app/partials/auth.html',
            controller: 'AuthenticationController'
        }).when('/about', {
            templateUrl: 'app/partials/about.html'
        }).otherwise({
            redirectTo: '/main'
        });

        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('deep-orange')
            .warnPalette('red')
    }]);

app.run(['$rootScope', '$location', '$mdSidenav', function ($rootScope, $location, $mdSidenav) {
    $rootScope.loggedIn = false;
}]);