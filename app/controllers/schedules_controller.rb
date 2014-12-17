class SchedulesController < ApplicationController
  before_action :set_schedule, only: [:show, :edit, :update, :destroy]

  # GET /schedules
  # GET /schedules.json
  def index
    @schedules = Schedule.all







    ################# API PULL CODE #############################

    # @uri = HTTParty.get"http://api.sportsdatallc.org/nba-t3/games/2014/REG/schedule.xml?api_key=3jdhu8c22zst6mn3p6fajnze"

    # @length = @uri['league']['season_schedule']['games']['game'].length
    # for @i in 0...@length 
    #   @home = @uri['league']['season_schedule']['games']['game'][@i]['home_team']
    #   @away = @uri['league']['season_schedule']['games']['game'][@i]['away_team']
    #   @date = @uri['league']['season_schedule']['games']['game'][@i]['Scheduled']
    #   Schedule.create(home_team_id: @home, away_team_id: @away, date_string: @date)
    # end
    # @teams = @uri['league']['season_schedule']['games']['game']
  end

  # GET /schedules/1
  # GET /schedules/1.json
  def show
  end

  # GET /schedules/new
  def new
    @schedule = Schedule.new
  end

  # GET /schedules/1/edit
  def edit
  end

  # POST /schedules
  # POST /schedules.json
  def create




    @schedule = Schedule.new(schedule_params)

    respond_to do |format|
      if @schedule.save
        format.html { redirect_to @schedule, notice: 'Schedule was successfully created.' }
        format.json { render :show, status: :created, location: @schedule }
      else
        format.html { render :new }
        format.json { render json: @schedule.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /schedules/1
  # PATCH/PUT /schedules/1.json
  def update
    respond_to do |format|
      if @schedule.update(schedule_params)
        format.html { redirect_to @schedule, notice: 'Schedule was successfully updated.' }
        format.json { render :show, status: :ok, location: @schedule }
      else
        format.html { render :edit }
        format.json { render json: @schedule.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /schedules/1
  # DELETE /schedules/1.json
  def destroy
    @schedule.destroy
    respond_to do |format|
      format.html { redirect_to schedules_url, notice: 'Schedule was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_schedule
      @schedule = Schedule.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def schedule_params
      params.require(:schedule).permit(:home_team_id, :away_team_id, :date_string)
    end
end
