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
      if(gamedate == newdate){
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
      if(gamedate == newdate){
        $scope.todaysContests.push($scope.contests[k]);
      }
    }
  });
  }, 5000);

  api.getPlayers()
  .then(function(data){
    $scope.players = data.data;
  });


  $scope.addContest = function(){
    // var dateContest = new Date();
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