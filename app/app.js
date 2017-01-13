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
            .warnPalette('red');

        $httpProvider.interceptors.push('APIInterceptor');
    }
])
;

app.run(['$rootScope', '$location', function ($rootScope, $location) {
    $rootScope.loggedIn = false;

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