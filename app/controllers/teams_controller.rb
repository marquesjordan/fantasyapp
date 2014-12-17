class TeamsController < ApplicationController
  before_action :set_team, only: [:show, :edit, :update, :destroy]

  # GET /teams
  # GET /teams.json
  def index
    @teams = Team.all




    ################# API PULL CODE #############################

    # @teamuri = HTTParty.get"http://api.sportsdatallc.org/nba-t3/seasontd/2014/REG/standings.xml?api_key= "

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

  # GET /teams/1
  # GET /teams/1.json
  def show
  end

  # GET /teams/new
  def new
    @team = Team.new
  end

  # GET /teams/1/edit
  def edit
  end

  # POST /teams
  # POST /teams.json
  def create
    @team = Team.new(team_params)

    respond_to do |format|
      if @team.save
        format.html { redirect_to @team, notice: 'Team was successfully created.' }
        format.json { render :show, status: :created, location: @team }
      else
        format.html { render :new }
        format.json { render json: @team.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /teams/1
  # PATCH/PUT /teams/1.json
  def update
    respond_to do |format|
      if @team.update(team_params)
        format.html { redirect_to @team, notice: 'Team was successfully updated.' }
        format.json { render :show, status: :ok, location: @team }
      else
        format.html { render :edit }
        format.json { render json: @team.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /teams/1
  # DELETE /teams/1.json
  def destroy
    @team.destroy
    respond_to do |format|
      format.html { redirect_to teams_url, notice: 'Team was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_team
      @team = Team.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def team_params
      params.require(:team).permit(:nba_team_id, :team_name)
    end
end
