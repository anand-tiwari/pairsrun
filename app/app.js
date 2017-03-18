var app = angular.module('app', ['ui.router','ngAnimate']);

app.config(['$stateProvider', '$urlRouterProvider','$locationProvider', 
        function($stateProvider, $urlRouterProvider, $locationProvider) {
            $urlRouterProvider.otherwise('/');
            $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/views/view.html',
                controller: 'appController'
            });
            $locationProvider.html5Mode(true);
}]);