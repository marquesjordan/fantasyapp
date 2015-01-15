class Entry
  include Mongoid::Document
  field :rank, type: Integer
  field :prize, type: Float
  field :pg_id, type: String
  field :sg_id, type: String
  field :sf_id, type: String
  field :pf_id, type: String
  field :c_id, type: String
  field :sixth_id, type: String
  field :pg_name, type: String
  field :sg_name, type: String
  field :sf_name, type: String
  field :pf_name, type: String
  field :c_name, type: String
  field :sixth_name, type: String
  field :fan_points, type: Float
  field :user_id, type: String
  field :nickname, type: String
  field :contest_id, type: String
end
