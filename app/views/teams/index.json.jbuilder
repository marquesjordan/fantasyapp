json.array!(@teams) do |team|
  json.extract! team, :id, :nba_team_id, :team_name
  json.url team_url(team, format: :json)
end
