class TeamsController < ApplicationController
  before_action :set_team, only: [:show, :edit, :update, :destroy]

  # GET /teams
  # GET /teams.json
  def index
    teams = Team.all
    @nba = Team.all
    # render json: teams, status: 200

    ################# API PULL CODE #############################

    # @teamuri = HTTParty.get"http://api.sportsdatallc.org/nba-t3/seasontd/2014/REG/standings.xml?api_key=3jdhu8c22zst6mn3p6fajnze"

    # @conf_count = @teamuri['league']['season']['conference'].count
    # @div_count = @teamuri['league']['season']['conference'][0]['division'].count

    # for a in 0...2
    #   for b in 0...3
    #     for c in 0...5
    #       t_id = @teamuri['league']['season']['conference'][a]['division'][b]['team'][c]['id']
    #       t_name = @teamuri['league']['season']['conference'][a]['division'][b]['team'][c]['name']
    #       Team.create(nba_team_id: t_id, team_name: t_name)
    #     end
    #   end  
    # end

  end

  def create
    team = Team.create(team_params)
    render json: team, status: 201
  end

  def edit
    @team = Team.find(params[:id])
  end

  def update
    team = Team.find(params[:id])
    team.update_attributes(team_params)
    redirect_to teams_path
    # render nothing: true, status: 204
  end

  def destroy
    team = Team.find(params[:id])
    team.destroy
    render nothing: true, status: 204
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_team
      @team = Team.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def team_params
      params.require(:team).permit(:nba_team_id, :team_name, :short_name)
    end
end
