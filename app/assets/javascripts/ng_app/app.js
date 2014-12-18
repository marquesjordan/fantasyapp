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
    //console.log(data.data[0]);
    $scope.players = data.data;
  });

  api.getSchedules()
  .then(function(data){
  	console.log('schedule');
    console.log(data.data[0]);
    $scope.schedule = data.data;
  });

  $scope.myTeam = [
  	{player: "Empty", position: "PG", cost: 0},
  	{player: "Empty", position: "SG", cost: 0},
  	{player: "Empty", position: "SF", cost: 0},
  	{player: "Empty", position: "PF", cost: 0},
  	{player: "Empty", position: "C", cost: 0}
  ];
  $scope.teamCost = 0;
  $scope.salary = 60000;
  $scope.positionType = ["All", "PG", "SG", "SF", "PF", "C"];

  $scope.setPosFilter = function(x){
  	$scope.filterPos = (x=="All"?"" : x);
  };

  $scope.picks = function(thisCell, num) {
  	// console.log(thisCell);
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
  		$scope.myTeam[$scope.pos].cost = thisCell.cost;
  		$scope.teamCost += thisCell.cost;
  		$scope.salary -= thisCell.cost;
  		console.log($scope.myTeam);
  	}
  	else {
  		console.log("Position Taken!!!");
  	}

  }

  $scope.removePick = function(thisCell, num){
  	$scope.myTeam[num].player = "Empty";
  	
  	console.log(thisCell.cost, num)
  	$scope.teamCost -= thisCell.cost;
  	$scope.salary = $scope.salary + thisCell.cost;
  	$scope.myTeam[num].cost = 0;
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
          },
          getSchedules: function() {

               var promise = $http.get('/api/schedules')
               .then(function(response) {
                    return response
               });
               console.log(promise);
               return promise;
          }
     }


});