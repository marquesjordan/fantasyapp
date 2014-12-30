angular.module('spaApp')

.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {

$urlRouterProvider.otherwise('/about');

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'home.html',
            controller: 'homeController'
        })
        .state('entry', {
            url: '/entry/:contest_id/:userid',
            templateUrl: 'entry.html',
            controller: 'entryController'
        })
        .state('team', {
            url: '/team/:contest_id',
            templateUrl: 'team.html',
            controller: 'teamController'
        })
        .state('about', {
            url: '/about',
            templateUrl: 'about.html'
        });


}]);