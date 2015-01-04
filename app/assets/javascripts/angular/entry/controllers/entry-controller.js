angular.module('spaApp')

.controller('entryController', ['$scope', 'api', '$stateParams',function($scope, api, $stateParams) {

  $scope.loading = [];

  api.getPlayers()
  .then(function(data){
    $scope.players = data.data;
  });

  api.getEntries()
  .then(function(data){
    $scope.userTeams = data.data;
    //console.log($scope.userTeams);
    // $stateParams.contest_id
    $scope.gameEntry = [];

    for(var ut=0;ut<$scope.userTeams.length;ut++){
      if($scope.userTeams[ut].contest_id == $stateParams.contest_id){
        $scope.gameEntry.push($scope.userTeams[ut]);
      }
    }
    $scope.gameEntryCount = $scope.gameEntry.length;
  });



  // JSON api call to get response from database of the days fantasy competitions.
  api.getContests()
  .then(function(data){
    $scope.contests = data.data; // Set scope value equal to list of objects
    $scope.todaysContests = []; // Array for todays Games
    
    // Set to length a games in schedule
    var contestLength = $scope.contests.length

    // Set todays date as date to look for
    var dy = new Date();
    var month = dy.getMonth() + 1; //months from 1-12
    var day = dy.getDate();
    var year = dy.getFullYear();
    // Format date for comparison purpose
    newdate = year + "-" + month + "-" + day;

    // Takes the date of the game string and splits it to get the date only
    // compares with date set above and pushes the game into array if date matches
    for(var k = 0; k < contestLength; k++){
      if($scope.contests[k].contest_date.split('T')[0] == newdate){
        $scope.todaysContests.push($scope.contests[k]);
      }
      // console.log($scope.contests[k]._id.$oid);
      // console.log($stateParams.contest_id);
      if($scope.contests[k]._id.$oid == $stateParams.contest_id ){
        $scope.totalPlayersAllowed = $scope.contests[k].num_players;
        $scope.contestFee = $scope.contests[k].fee
      }
    }
  });



  $scope.today_schedule = [];

  api.getSchedules()
  .then(function(data){
    
    var d = new Date();
    var month = d.getMonth() + 1; //months from 1-12
    var day = d.getDate();
    var year = d.getFullYear();
    newdate = year + "-" + month + "-" + day;

    $scope.todays_players = [];
    $scope.schedule = data.data;

    $scope.today_teams = [];

    $scope.sched_size = $scope.schedule.length;


    for(var i = 0; i<$scope.sched_size;i++){
      var game_d = new Date($scope.schedule[i].game_date);
      month = game_d.getMonth() + 1; //months from 1-12
      day = game_d.getDate();
      year = game_d.getFullYear();
      $scope.gm_date = year + "-" + month + "-" + day;

      var hr = game_d.getHours();
      var min = game_d.getMinutes();
      if (min < 10) {
          min = "0" + min;
      }
      var ampm = hr < 12 ? "am" : "pm";
      var new_hr = hr > 12 ? (hr - 12) : hr;
      var gm_time = new_hr + ":" + min + ampm;


      //console.log(game_d.getTime());

      

      if($scope.gm_date == newdate){
        $scope.today_schedule.push({ away: $scope.schedule[i].away_team_id,
                                     away_name: 'Empty',
                                     home: $scope.schedule[i].home_team_id, 
                                     home_name: 'Empty',
                                     // time: $scope.schedule[i].game_date
                                     //time: game_d.toLocaleTimeString()
                                     time: gm_time
                                   });

        $scope.today_teams.push($scope.schedule[i].away_team_id);
        $scope.today_teams.push($scope.schedule[i].home_team_id);
      }
    }

    
    $scope.today_size = $scope.today_teams.length

    for(var x = 0; x < $scope.today_size; x++){

      for(var p = 0; p < $scope.players.length; p++){

        if($scope.players[p].team_id == $scope.today_teams[x]){
          // var playerObj = {info: $scope.players[p], selected: "+" };
          $scope.todays_players.push($scope.players[p]);  
        }

      }
    }

  api.getTeams()
  .then(function(data){
    $scope.teams = data.data;


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
    //console.log($scope.today_schedule[0]);


  });


    //console.log($scope.todays_players[0]);
  });
  

  $scope.myTeam = [
    {player_id: 0, player: "Add Player", position: "PG", cost: 0, pic: ""},
    {player_id: 0, player: "Add Player", position: "SG", cost: 0, pic: ""},
    {player_id: 0, player: "Add Player", position: "SF", cost: 0, pic: ""},
    {player_id: 0, player: "Add Player", position: "PF", cost: 0, pic: ""},
    {player_id: 0, player: "Add Player", position: "C", cost: 0, pic: ""},
    {player_id: 0, player: "Add Player", position: "6TH MAN", cost: 0, pic: ""}
  ];
  $scope.teamCost = 0;
  $scope.salary = 45000;
  $scope.positionType = ["All", "PG", "SG", "SF", "PF", "C"];

  $scope.setPosFilter = function(x){
    $scope.filterPos = (x=="All"?"" : x);
  };
  $scope.selectedPlayer = [];
  $scope.picks = function(thisCell, num) {
    // //console.log(thisCell);
    //console.log(num);

    if(thisCell.position == "PG"){
      //console.log("Point Gaurd");
      $scope.pos = 0;
    }
    else if(thisCell.position == "SG"){
      //console.log("Shooting Gaurd");
      $scope.pos = 1;
    }
    else if(thisCell.position == "SF"){
      //console.log("Small Forward");
      $scope.pos = 2;
    }
    else if(thisCell.position == "PF"){
      //console.log("Power Forward");
      $scope.pos = 3;
    }
    else if(thisCell.position == "C"){
      //console.log("Center");
      $scope.pos = 4;
    }
    
    var strname = thisCell.name
    strname = strname.replace(".", "");
    strname = strname.replace(".", "");

    var pname = strname.split(" ");
    var webname = pname[0] + "_" + pname[1];
    $scope.webpic = "http://i.cdn.turner.com/nba/nba/.element/img/2.0/sect/statscube/players/large/" + webname + ".png";

    if($scope.myTeam[$scope.pos].player == "Add Player"){
      $scope.myTeam[$scope.pos].player_id = thisCell.player_id;
      $scope.myTeam[$scope.pos].player = thisCell.name;
      $scope.myTeam[$scope.pos].cost = thisCell.cost;

      $scope.myTeam[$scope.pos].pic = $scope.webpic;
      $scope.loading[$scope.pos] = true;
      $scope.teamCost += thisCell.cost;
      $scope.salary -= thisCell.cost;
      
    }else if($scope.myTeam[$scope.pos].player_id == thisCell.player_id ){
      alert("Player Used Already!");
    }else if($scope.myTeam[5].player == "Add Player"){
      $scope.myTeam[5].player_id = thisCell.player_id;
      $scope.myTeam[5].player = thisCell.name;
      $scope.myTeam[5].cost = thisCell.cost;
      $scope.myTeam[5].pic = $scope.webpic;
      $scope.loading[5] = true;
      $scope.teamCost += thisCell.cost;
      $scope.salary -= thisCell.cost;
    }else {
      console.log("Position Taken!!!");
    }
    console.log($scope.myTeam);
  }

  $scope.removePick = function(thisCell, num){
    $scope.myTeam[num].player_id = 0;
    $scope.myTeam[num].player = "Add Player";
    $scope.myTeam[num].pic = "";
    $scope.loading[num] = false;
    //console.log(thisCell.cost, num)
    $scope.teamCost -= thisCell.cost;
    $scope.salary = $scope.salary + thisCell.cost;
    $scope.myTeam[num].cost = 0;
  }

  $scope.addEntry = function(){
    var userTeam = { team: $scope.myTeam, contest: $stateParams.contest_id };
    // Post at a endpoint
    var checkPoint = 0;
    for(var check=0;check<6;check++){
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

  $scope.clearAll = function(){
    for(var k = 0; k<6;k++){
      $scope.myTeam[k].player_id = 0;
      $scope.myTeam[k].player = "Add Player";
      $scope.myTeam[k].pic = "";
      $scope.teamCost -= $scope.myTeam[k].cost;
      $scope.salary = $scope.salary + $scope.myTeam[k].cost;
      $scope.myTeam[k].cost = 0;
    }
  }

}]);