class EntriesController < ApplicationController
  before_action :set_entry, only: [:show, :edit, :update, :destroy]

  respond_to :html

  def index
    entries = Entry.all
    render json: entries, status: 200
  end

  def create
    entry = Entry.create(entry_params)
    render json: entry, status: 201
  end

  def update
    entry = Entry.find(params[:id])
    entry.update_attributes(entry_params)
    render nothing: true, status: 204
  end

  def destroy
    entry = Entry.find(params[:id])
    entry.destroy
    render nothing: true, status: 204
  end


  private
    def set_entry
      @entry = Entry.find(params[:id])
    end

    def entry_params
      params.require(:entry).permit(:rank, :prize, :pg_id, :sg_id, :sf_id, :pf_id, :c_id, :pg_name, :sg_name, :sf_name, :pf_name, :c_name, :fan_points)
    end
end
