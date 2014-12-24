angular.module('spaApp', ['ui.router', 'templates'])

.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {

$urlRouterProvider.otherwise('/about');

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'home.html',
            controller: 'homeController'
        })
        .state('entry', {
            url: '/entry/:contest_id',
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


}])


.controller('homeController', ['$scope', 'api', function($scope, api) {

  

  api.getContests()
  .then(function(data){
    $scope.contests = data.data;
    
    $scope.todaysContests = [];
    var contestLength = $scope.contests.length
    var dy = new Date();
    var month = dy.getMonth() + 1; //months from 1-12
    var day = dy.getDate();
    var year = dy.getFullYear();
    newdate = year + "-" + month + "-" + day;

    console.log($scope.contests[0].contest_date.split('T')[0]);
    console.log(newdate);
    console.log($scope.contests[0].contest_date.split('T')[0] == newdate);

    for(var k = 0; k < contestLength; k++){
      if($scope.contests[k].contest_date.split('T')[0] == newdate){
        $scope.todaysContests.push($scope.contests[k]);
      }
    }
    console.log($scope.todaysContests);

  });

}])


.controller('entryController', ['$scope', 'api', '$stateParams',function($scope, api, $stateParams) {

  // if($stateParams.contest_id.length < 6){
  //   $location.path('/home'); 
  // }

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
  	{player_id: 0, player: "Empty", position: "PG", cost: 0},
  	{player_id: 0, player: "Empty", position: "SG", cost: 0},
  	{player_id: 0, player: "Empty", position: "SF", cost: 0},
  	{player_id: 0, player: "Empty", position: "PF", cost: 0},
  	{player_id: 0, player: "Empty", position: "C", cost: 0}
  ];
  $scope.teamCost = 0;
  $scope.salary = 35000;
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
      $scope.myTeam[$scope.pos].player_id = thisCell.player_id;
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
  	$scope.myTeam[num].player_id = 0;
  	$scope.myTeam[num].player = "Empty";
  	console.log(thisCell.cost, num)
  	$scope.teamCost -= thisCell.cost;
  	$scope.salary = $scope.salary + thisCell.cost;
  	$scope.myTeam[num].cost = 0;
  }

  $scope.addEntry = function(){
    var userTeam = { team: $scope.myTeam, contest: $stateParams.contest_id };
    // Post at a endpoint
    var checkPoint = 0;
    for(var check=0;check<4;check++){
      if($scope.myTeam[check].player_id == 0){
        checkPoint = 1;
      }
    }

    if(checkPoint == 1){
      alert("Your team is not complete!");
    }
    else if($scope.salary < 0){
      alert("You are over your salary!");
    }else{
      api.createEntry(userTeam);
      // $location.path('/home');
    }
  }

}])

.controller('teamController', ['$scope', 'api', '$stateParams',function($scope, api, $stateParams) {

  api.getEntries()
  .then(function(data){
    $scope.userTeams = data.data;
    console.log($scope.userTeams);
    // $stateParams.contest_id
    $scope.gameEntry = [];

    for(var ut=0;ut<$scope.userTeams.length;ut++){
      if($scope.userTeams[ut].contest_id == $stateParams.contest_id){
        $scope.gameEntry.push($scope.userTeams[ut]);
      }
    }

  });

}])
.service('api', function($http, $location) {
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
          },
          getContests: function() {

               var promise = $http.get('/api/contests')
               .then(function(response) {
                    return response
               });
               console.log(promise);
               return promise;
          },
          getEntries: function() {

               var promise = $http.get('/api/entries')
               .then(function(response) {
                    return response
               });
               console.log(promise);
               return promise;
          },
          createEntry: function(userTeam) {
            console.log(userTeam);
            // userTeam[0];
            $http.post('api/entries', {rank: 0, prize: 0,
                                      pg_id: userTeam['team'][0].player_id,
                                      pg_name: userTeam['team'][0].player,
                                      sg_id: userTeam['team'][1].player_id,
                                      sg_name: userTeam['team'][1].player,
                                      sf_id: userTeam['team'][2].player_id,
                                      sf_name: userTeam['team'][2].player,
                                      pf_id: userTeam['team'][3].player_id,
                                      pf_name: userTeam['team'][3].player,
                                      c_id: userTeam['team'][4].player_id,
                                      c_name: userTeam['team'][4].player,
                                      fan_points: 0, contest_id: userTeam['contest']
                                      }
                      ).success(function(){ $location.path('/home') } );
                        //$location.path('/home') } );
            

            // (:rank, :prize, :pg_id, :sg_id, :sf_id, :pf_id, :c_id, :pg_name, :sg_name, :sf_name, :pf_name, :c_name, :fan_points)
          }

     }


});