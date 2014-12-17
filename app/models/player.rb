class Player
  include Mongoid::Document
  field :team_id, type: String
  field :name, type: String
  field :position, type: String
end
