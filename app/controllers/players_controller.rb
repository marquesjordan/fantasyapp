class PlayersController < ApplicationController
  before_action :set_player, only: [:show, :edit, :update, :destroy]
  attr_accessor :tid
  # GET /players
  # GET /players.json
  def index
    players = Player.all
    # render json: players, status: 200

    # p = Player.all
    # p.each do |player|
      
    #   number = player.fantasy * 238
    #   player.cost = (number.floor/100)*100
    #   if player.cost < 3500
    #     player.cost = 3500
    #   end
    #   player.save
    # end
    
    ################# API PULL CODE #############################
    
    # @puri = HTTParty.get"http://api.sportsdatallc.org/nba-t3/teams/583ecd4f-fb46-11e1-82cb-f4ce4684ea4c/profile.xml?api_key=3jdhu8c22zst6mn3p6fajnze"
    # @teams.each do |t|
    teams = Team.all
    @count = teams.length
    
    ####################### CALLING API FOR TEAM STATS & PLAYER INFO ########################

  for i in 0...@count
    tid = teams[i].nba_team_id

    # @puri = HTTParty.get"http://api.sportsdatallc.org/nba-t3/seasontd/2014/REG/teams/583ecd4f-fb46-11e1-82cb-f4ce4684ea4c/statistics.xml?api_key=3jdhu8c22zst6mn3p6fajnze"

      @url = "http://api.sportsdatallc.org/nba-t3/seasontd/2014/REG/teams/#{tid}/statistics.xml?api_key=3jdhu8c22zst6mn3p6fajnze"

      # @response_array = []
      
      begin   # raisebegin
         @puri = HTTParty.get(@url)
         team_count = @puri['season']['team']['player_records']['player'].count
      rescue
        sleep 1
        @puri = HTTParty.get(@url)
      ensure 
       
      end

      team_count = @puri['season']['team']['player_records']['player'].count
      for x in 0...team_count
      

        pid = @puri['season']['team']['player_records']['player'][x]['id']
        name = @puri['season']['team']['player_records']['player'][x]['full_name']
        pos = @puri['season']['team']['player_records']['player'][x]['primary_position']
        pts = @puri['season']['team']['player_records']['player'][x]['overall']['average']['points'].to_f
        ast = @puri['season']['team']['player_records']['player'][x]['overall']['average']['assists'].to_f
        reb = @puri['season']['team']['player_records']['player'][x]['overall']['average']['rebounds'].to_f
        stl = @puri['season']['team']['player_records']['player'][x]['overall']['average']['steals'].to_f
        trn = @puri['season']['team']['player_records']['player'][x]['overall']['average']['turnovers'].to_f
        blk = @puri['season']['team']['player_records']['player'][x]['overall']['average']['blocks'].to_f

        fan = ( (pts * 1 ) + (ast * 1.5) + (reb * 1.2 ) + (stl * 2) + (blk * 2) ) - (trn * 1)
        fan = fan.round(2)
        Player.create(player_id: pid, team_id: tid, name: name, position: pos, points: pts, assists: ast, rebounds: reb, steals: stl, turnovers: trn, blocks: blk, fantasy: fan,cost: 0)
      end
    end





    ####################### CALLING API FOR JUST ROSTER ########################

    # for i in 0...@count
    #   tid = teams[i].nba_team_id
      
    
    #   @url = "http://api.sportsdatallc.org/nba-t3/teams/#{tid}/profile.xml?api_key=3jdhu8c22zst6mn3p6fajnze"

    #   @response_array = []
      
    #   begin   # raisebegin
    #      @puri = HTTParty.get(@url)
    #      @count = @puri['team']['players']['player'].count
    #   rescue
    #     sleep 1
    #     @puri = HTTParty.get(@url)
    #   ensure 
       
    #   end
      
    #    team_count = @puri['team']['players']['player'].count
    #      for x in 0...team_count
    #        pid = @puri['team']['players']['player'][x]['id']
    #        name = @puri['team']['players']['player'][x]['full_name']
    #        pos = @puri['team']['players']['player'][x]['primary_position']
    #        Player.create(player_id: pid, team_id: tid, name: name, position: pos)
          
    #      end
    # end
    #raise @response_array.inspect
  end

  def create
    player = Player.create(player_params)
    render json: player, status: 201
  end

  def update
    player = Player.find(params[:id])
    player.update_attributes(player_params)
    render nothing: true, status: 204
  end

  def destroy
    player = Player.find(params[:id])
    player.destroy
    render nothing: true, status: 204
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_player
      @player = Player.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def player_params
      params.require(:player).permit(:player_id, :team_id, :name, :position, :points, :assists,
                :rebounds, :steals, :turnovers, :blocks, :fantasy, :cost)
    end
end
