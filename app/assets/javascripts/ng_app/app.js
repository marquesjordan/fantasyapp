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

  $scope.myTeam = [
  	{player: "Empty", position: "PG"},
  	{player: "Empty", position: "SG"},
  	{player: "Empty", position: "SF"},
  	{player: "Empty", position: "PF"},
  	{player: "Empty", position: "C"},
  ];

  $scope.picks = function(thisCell, num) {
  	console.log(thisCell);
  	console.log(num);

  	if(thisCell.position == "PG"){
  		console.log("Point Gaurd");
  		$scope.pos = 0;
  	}
  	else if(thisCell.position == "SG"){
  		console.log("Shooting Gaurd");
  		$scope.pos = 1;
  	}
  	else if(thisCell.position == "SF"){
  		console.log("Small Forward");
  		$scope.pos = 2;
  	}
  	else if(thisCell.position == "PF"){
  		console.log("Power Forward");
  		$scope.pos = 3;
  	}
  	else if(thisCell.position == "C"){
  		console.log("Center");
  		$scope.pos = 4;
  	}

  	if($scope.myTeam[$scope.pos].player == "Empty"){
  		$scope.myTeam[$scope.pos].player = thisCell.name;
  		console.log($scope.myTeam);
  	}
  	else {
  		console.log("Position Taken!!!");
  	}

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