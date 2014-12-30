angular.module('spaApp')

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

    // Adds all of todays contest into an Scope Array
    for(var k = 0; k < contestLength; k++){
      if($scope.contests[k].contest_date.split('T')[0] == newdate){
        $scope.todaysContests.push($scope.contests[k]);
      }
    }

  });

  api.getPlayers()
  .then(function(data){
    $scope.players = data.data;
  });

}]);