class ContestsController < ApplicationController
  before_action :set_contest, only: [:show, :edit, :update, :destroy]

  respond_to :html

  def index
    contests = Contest.all
    # contests = Contest.where("contest_date > ?", Date.today())
    render json: contests, status: 200
  end

  def create
    contest = Contest.create(contest_params)
    
    
    render json: contest, status: 201
  end

  def update
    contest = Contest.find(params[:id])
    contest.update_attributes(contest_params)
    render nothing: true, status: 204
  end

  def destroy
    contest = Contest.find(params[:id])
    contest.destroy
    render nothing: true, status: 204
  end


  private
    def set_contest
      @contest = Contest.find(params[:id])
    end

    def contest_params
      params.require(:contest).permit(:contest_type, :description, :players_count, :num_players, :fee, :contest_date, :contest_prize)
    end
end
