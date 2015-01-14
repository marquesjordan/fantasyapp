class Contest
  include Mongoid::Document
  field :contest_type, type: Integer
  field :description, type: String
  field :players_count, type: Integer, default: 0
  field :num_players, type: Integer
  field :fee, type: Integer
  field :contest_date, type: String
  field :contest_prize, type: Integer, default: 0
end
