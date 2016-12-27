var app = angular.module("App", ['ngRoute', 'ngMaterial', 'ngAnimate', 'ngAria']);

app.config(['$routeProvider', '$httpProvider', '$mdThemingProvider', '$mdIconProvider',
    function ($routeProvider, $httpProvider, $mdThemingProvider, $mdIconProvider) {
        $routeProvider.when('/main', {
            templateUrl: 'app/partials/main.html',
            controller: 'MainController'
        }).when('/about', {
            templateUrl: 'app/partials/about.html'
        }).otherwise({
            redirectTo: '/main'
        });

        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('deep-orange')
            .warnPalette('red');
    }]);

app.run(['$rootScope', '$location', '$routeParams', function ($rootScope, $location, $routeParams) {
    $rootScope.$on('$routeChangeSuccess', function (e, current, pre) {
        $rootScope.currentNavItem = $location.path().replace('/', '');
        $rootScope.icon = 'app/images/svg/file-5.svg';
    });
}]);