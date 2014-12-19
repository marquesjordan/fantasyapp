json.array!(@contests) do |contest|
  json.extract! contest, :id, :contest_type, :num_players
  json.url contest_url(contest, format: :json)
end
