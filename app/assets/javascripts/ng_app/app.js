angular.module('spaApp', ['ui.router', 'templates'])

.config(function($stateProvider, $urlRouterProvider) {

$urlRouterProvider.otherwise('/');

    $stateProvider

        .state('home', {
            url: '/home',
            templateUrl: 'home.html',
            controller: 'homeController'
        })
        .state('about', {
            url: '/about',
            templateUrl: 'about.html'
        });


})

.controller('homeController', function($scope, api) {

  api.getPlayers()
  .then(function(data){
    console.log(data.data[0]);
    $scope.players = data.data;
  });

  $scope.picks = function(thisCell, num) {
  	console.log(thisCell);
  	console.log(num);
  }

})

.service('api', function($http) {
     return {
          getPlayers: function() {

               var promise = $http.get('/api/players')
               .then(function(response) {
                    return response
               });
               console.log(promise);
               return promise;
          }
     }

});