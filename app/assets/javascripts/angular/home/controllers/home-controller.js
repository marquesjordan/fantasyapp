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
      // console.log($scope.contests[k].contest_date.split("T")[0]);
      if($scope.contests[k].contest_date.split("T")[0] == newdate){
        $scope.todaysContests.push($scope.contests[k]);
      }
    }
  });

  api.getPlayers()
  .then(function(data){
    $scope.players = data.data;
  });

  $scope.addContest = function(){
    var dy = new Date();
    if( $scope.challenge == 0){
      $scope.desc = "Tournament Challenge"
    }else if($scope.challenge == 1){
      $scope.desc = "50/50 League"
    }
    var newContest = {contest_type: $scope.challenge, description: $scope.desc, num_players: $scope.c_size, fee: $scope.amount, contest_date: dy };


    api.createContest(newContest);
    //console.log($scope.challenge);
  };

}]);