angular.module('spaApp', ['ui.router', 'templates'])

.config(function($stateProvider, $urlRouterProvider) {

$urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'home.html',
            controller: 'homeController'
        })
        .state('entry', {
            url: '/entry',
            templateUrl: 'entry.html',
            controller: 'entryController'
        })
        .state('about', {
            url: '/about',
            templateUrl: 'about.html'
        });


})
.controller('homeController', function($scope, api) {


})


.controller('entryController', function($scope, api) {
  $scope.today_schedule = [];
  api.getPlayers()
  .then(function(data){
    //console.log(data.data[0]);
    $scope.players = data.data;


  });

  api.getSchedules()
  .then(function(data){
  	console.log('schedule');
  	
		var d = new Date();
  	var month = d.getMonth() + 1; //months from 1-12
		var day = d.getDate();
		var year = d.getFullYear();
		newdate = year + "-" + month + "-" + day;

    $scope.todays_players = [];
    $scope.schedule = data.data;

    $scope.today_teams = [];

    console.log($scope.schedule.length);
    $scope.size = $scope.schedule.length;


    for(var i = 0; i<$scope.size;i++){
    	var game_d = new Date($scope.schedule[i].game_date);
	  	month = game_d.getMonth() + 1; //months from 1-12
			day = game_d.getDate();
			year = game_d.getFullYear();
			$scope.gm_date = year + "-" + month + "-" + day;

      

    	if($scope.gm_date == newdate){
    		console.log($scope.schedule[i]);
        $scope.today_schedule.push({ away: $scope.schedule[i].away_team_id,
                                     away_name: 'Empty',
                                     home: $scope.schedule[i].home_team_id, 
                                     home_name: 'Empty',
                                     time: $scope.schedule[i].game_date
                                   });
    		$scope.today_teams.push($scope.schedule[i].away_team_id);
    		$scope.today_teams.push($scope.schedule[i].home_team_id);
    	}
    }

    
    $scope.today_size = $scope.today_teams.length

    for(var x = 0; x < $scope.today_size; x++){

    	for(var p = 0; p < $scope.players.length; p++){

    		if($scope.players[p].team_id == $scope.today_teams[x]){
    			$scope.todays_players.push($scope.players[p]);	
    		}

    	}
    }

    console.log($scope.todays_players[0]);
  });
  
  api.getTeams()
  .then(function(data){
    $scope.teams = data.data;
    console.log(data.data[0]);
    console.log($scope.teams[0]);
    console.log($scope.today_schedule[0]);

    for(var ts = 0; ts < $scope.today_schedule.length; ts++ ){
      name_search1 = $scope.today_schedule[ts]['away'];
      name_search2 = $scope.today_schedule[ts]['home'];
      for(var find_name = 0; find_name < $scope.teams.length; find_name++){
        if(name_search1 == $scope.teams[find_name].nba_team_id){
          $scope.today_schedule[ts]['away_name'] = $scope.teams[find_name].team_name;
        }
        if(name_search2 == $scope.teams[find_name].nba_team_id){
          $scope.today_schedule[ts]['home_name'] = '@ ' + $scope.teams[find_name].team_name;
        }
      }
    }
    console.log($scope.today_schedule[0]);


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
          },
          getTeams: function() {

               var promise = $http.get('/api/teams')
               .then(function(response) {
                    return response
               });
               console.log(promise);
               return promise;
          }
     }


});