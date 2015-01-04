class EntriesController < ApplicationController
  before_action :set_entry, only: [:show, :edit, :update, :destroy]

   # AJAX request I was making didn't carry the CSRF token. For that reason, 
   # Rails was killing my session.I added skip_before_filter :verify_authenticity_token
  skip_before_filter :verify_authenticity_token
  respond_to :html

  def index
    entries = Entry.all
    render json: entries, status: 200
  end

  def create
    # raise current_user
    entry = Entry.create(entry_params)
    if user_signed_in?
      entry.user_id = current_user.id
    else
      # raise current_user
      entry.user_id = 4
     # entry.user_id = current_user.id
    end
    
    entry.save
    render json: entry, status: 201
    # redirect_to root_path
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
      params.require(:entry).permit(:rank, :prize, :pg_id, :sg_id, :sf_id, :pf_id, :c_id, :sixth_id, :pg_name, :sg_name, :sf_name, :pf_name, :c_name, :sixth_name, :fan_points, :user_id, :contest_id)
    end
end
