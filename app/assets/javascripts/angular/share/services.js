angular.module('spaApp')

.service('api', function($http, $location) {
     return {
          getPlayers: function() {

               var promise = $http.get('/api/players')
               .then(function(response) {
                    return response
               });
               //console.log(promise);
               return promise;
          },
          getSchedules: function() {

               var promise = $http.get('/api/schedules')
               .then(function(response) {
                    return response
               });
               //console.log(promise);
               return promise;
          },
          getTeams: function() {

               var promise = $http.get('/api/teams')
               .then(function(response) {
                    return response
               });
               //console.log(promise);
               return promise;
          },
          getContests: function() {

               var promise = $http.get('/api/contests')
               .then(function(response) {
                    return response
               });
               //console.log(promise);
               return promise;
          },
          getEntries: function() {

               var promise = $http.get('/api/entries')
               .then(function(response) {
                    return response
               });
               //console.log(promise);
               return promise;
          },
          createEntry: function(userTeam) {
            //console.log(userTeam);
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
                    
  
          }

     }


});