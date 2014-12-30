angular.module('spaApp')

.controller('teamController', ['$scope', 'api', '$stateParams',function($scope, api, $stateParams) {

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

  });

}]);