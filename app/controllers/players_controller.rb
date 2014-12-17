class PlayersController < ApplicationController
  before_action :set_player, only: [:show, :edit, :update, :destroy]
  attr_accessor :tid
  # GET /players
  # GET /players.json
  def index
    players = Player.all
    render json: players, status: 200

    
    ################# API PULL CODE #############################
    
    # @puri = HTTParty.get"http://api.sportsdatallc.org/nba-t3/teams/583ecd4f-fb46-11e1-82cb-f4ce4684ea4c/profile.xml?api_key=3jdhu8c22zst6mn3p6fajnze"
    # @teams.each do |t|
    # teams = Team.all
    # @count = Team.count
    # for i in 0...@count
    #   tid = teams[i].nba_team_id
      
    
      # @url = "http://api.sportsdatallc.org/nba-t3/teams/#{@tid}/profile.xml?api_key=3jdhu8c22zst6mn3p6fajnze"
      # @puri = HTTParty.get("http://api.sportsdatallc.org/nba-t3/teams/583ed0ac-fb46-11e1-82cb-f4ce4684ea4c/profile.xml?api_key=3jdhu8c22zst6mn3p6fajnze")
      # tid = "583ed0ac-fb46-11e1-82cb-f4ce4684ea4c"
      # team_count = @puri['team']['players']['player'].count
      #   for x in 0...team_count
      #     name = @puri['team']['players']['player'][x]['full_name']
      #     pos = @puri['team']['players']['player'][x]['primary_position']
      #     Player.create(team_id: tid, name: name, position: pos)
      #   end

  end

  def create
    player = Player.create(player_params)
    render json: planet, status: 201
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
      params.require(:player).permit(:team_id, :name, :position)
    end
end
