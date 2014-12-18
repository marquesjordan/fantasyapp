class Player
  include Mongoid::Document
  field :player_id, type: String
  field :team_id, type: String
  field :name, type: String
  field :position, type: String
  field :points, type: Float
  field :assists, type: Float
  field :rebounds, type: Float
  field :steals, type: Float
  field :blocks, type: Float
  field :turnovers, type: Float
  field :fantasy, type: Float
  field :cost, type: Integer
end
