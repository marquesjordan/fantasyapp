class Schedule
  include Mongoid::Document
  field :home_team_id, type: String
  field :away_team_id, type: String
  field :date_string, type: String
end
