angular.module('spaApp')

.controller('homeController', ['$scope', 'api', function($scope, api) {
  api.getContests()
  .then(function(data){
    $scope.contests = data.data;
    
    $scope.todaysContests = [];
    var contestLength = $scope.contests.length
    var dy = new Date();
    var month = dy.getMonth() + 1; //months from 1-12
    if(month < 10){
      month = "0" + month;
    }
    var day = dy.getDate();
    if(day < 10){
      day = "0" + day;
    }
    var year = dy.getFullYear();
    newdate = year + "-" + month + "-" + day;

    // Adds all of todays contest into an Scope Array
    for(var k = 0; k < contestLength; k++){
      // console.log(newdate);
      // var gdate = new Date($scope.contests[k].contest_date);
      // console.log($scope.contests[k].contest_date);
      // month = gdate.getMonth() + 1; //months from 1-12
      // if(month < 10){
      //   month = "0" + month;
      // }
      // day = gdate.getDate();
      // if(day < 10){
      //   day = "0" + day;
      // }
      // year = gdate.getFullYear();
      // gamedate = year + "-" + month + "-" + day;
      // console.log(gdate);
      // console.log($scope.contests[k].contest_date.split("T")[0]);
      // if($scope.contests[k].contest_date.split("T")[0] == newdate){
      gamedate = $scope.contests[k].contest_date;
      if(gamedate == newdate && $scope.contests[k].contest_full == false){
        $scope.todaysContests.push($scope.contests[k]);
      }
    }
  });
  
  setInterval(function() {
  api.getContests()
  .then(function(data){
    $scope.contests = data.data;
    
    $scope.todaysContests = [];
    var contestLength = $scope.contests.length
    var dy = new Date();
    var month = dy.getMonth() + 1; //months from 1-12
    if(month < 10){
      month = "0" + month;
    }
    var day = dy.getDate();
    if(day < 10){
      day = "0" + day;
    }
    var year = dy.getFullYear();
    newdate = year + "-" + month + "-" + day;

    // Adds all of todays contest into an Scope Array
    for(var k = 0; k < contestLength; k++){
      // console.log(newdate);
      // var gdate = new Date($scope.contests[k].contest_date);
      // console.log($scope.contests[k].contest_date);
      // month = gdate.getMonth() + 1; //months from 1-12
      // if(month < 10){
      //   month = "0" + month;
      // }
      // day = gdate.getDate();
      // if(day < 10){
      //   day = "0" + day;
      // }
      // year = gdate.getFullYear();
      // gamedate = year + "-" + month + "-" + day;
      // console.log(gdate);
      // console.log($scope.contests[k].contest_date.split("T")[0]);
      // if($scope.contests[k].contest_date.split("T")[0] == newdate){
      gamedate = $scope.contests[k].contest_date;
      if(gamedate == newdate && $scope.contests[k].contest_full == false){
        $scope.todaysContests.push($scope.contests[k]);
        console.log($scope.contests[k].players_count);
      }
    }
  });
  }, 5000);

  api.getPlayers()
  .then(function(data){
    $scope.players = data.data;
  });


  $scope.addContest = function(){
    $scope.today_schedule = [];

    api.getSchedules()
    .then(function(data4){

      $scope.schedule = data4.data;

      $scope.todayGameTimes = [];

      $scope.sched_size = $scope.schedule.length;

      var tm = new Date();
      var month_tm = tm.getMonth() + 1; //months from 1-12
      if(month_tm < 10){
        month_tm = "0" + month_tm;
      }
      var day_tm = tm.getDate();
      if(day_tm < 10){
        day_tm = "0" + day_tm;
      }
      var year_tm = dy.getFullYear();
      $scope.timedate = year_tm + "-" + month_tm + "-" + day_tm;
      // console.log(timedate);

      for(var i = 0; i<$scope.sched_size;i++){
        var game_d = new Date($scope.schedule[i].game_date);
        console.log(new Date($scope.schedule[i].game_date).getTime());
        month = game_d.getMonth() + 1; //months from 1-12
        if(month < 10){
          month = "0" + month;
        }
        day = game_d.getDate();
        if(day < 10){
          day = "0" + day;
        }
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

        if($scope.gm_date == $scope.timedate){
          
          $scope.todayGameTimes.push(gm_time);
        }
      }
      console.log($scope.todayGameTimes[0]);
    });

    var dy = new Date();
    var month = dy.getMonth() + 1; //months from 1-12
    if(month < 10){
      month = "0" + month;
    }
    var day = dy.getDate();
    if(day < 10){
      day = "0" + day;
    }
    var year = dy.getFullYear();
    $scope.tgamedate = year + "-" + month + "-" + day;

    if( $scope.challenge == 0){
      $scope.desc = "Tournament Challenge"
    }else if($scope.challenge == 1){
      $scope.desc = "50/50 League"
    }
    var newContest = {contest_type: $scope.challenge, description: $scope.desc, num_players: $scope.c_size, fee: $scope.amount, contest_date: $scope.tgamedate };


    api.createContest(newContest);
    //console.log($scope.challenge);
  };

}]);