class Schedule
  include Mongoid::Document
  field :home_team_id, type: String
  field :away_team_id, type: String
  field :game_date, type: String
  field :game_time, type: String
end
