class Team
  include Mongoid::Document
  field :nba_team_id, type: String
  field :team_name, type: String
  field :short_name, type: String
end
