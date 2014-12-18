class SchedulesController < ApplicationController
  before_action :set_schedule, only: [:show, :edit, :update, :destroy]

  # GET /schedules
  # GET /schedules.json
  def index
    schedules = Schedule.all
    render json: schedules, status: 200

    ################# API PULL CODE #############################

    # @uri = HTTParty.get"http://api.sportsdatallc.org/nba-t3/games/2014/REG/schedule.xml?api_key=3jdhu8c22zst6mn3p6fajnze"

    # @length = @uri['league']['season_schedule']['games']['game'].length
    
    # for @i in 0...@length 
      
    #   @home = @uri['league']['season_schedule']['games']['game'][@i]['home_team']
    #   @away = @uri['league']['season_schedule']['games']['game'][@i]['away_team']
    #   @fulldate = @uri['league']['season_schedule']['games']['game'][@i]['scheduled']

    #   # fulldate_array = fulldate.split('T')
    #   # @date = fulldate_array[0]
    #   # @time = fulldate_array[1].split('+')[0]

    #   Schedule.create(home_team_id: @home, away_team_id: @away, game_date: @fulldate)
    # end
    # @teams = @uri['league']['season_schedule']['games']['game']
  end

  def create
    schedule = Schedule.create(schedule_params)
    render json: schedule, status: 201
  end

  def update
    schedule = Schedule.find(params[:id])
    schedule.update_attributes(schedule_params)
    render nothing: true, status: 204
  end

  def destroy
    schedule = Schedule.find(params[:id])
    schedule.destroy
    render nothing: true, status: 204
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_schedule
      @schedule = Schedule.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def schedule_params
      params.require(:schedule).permit(:home_team_id, :away_team_id, :game_date, :game_time)
    end
end
