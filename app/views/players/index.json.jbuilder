json.array!(@players) do |player|
  json.extract! player, :id, :team_id, :name, :position
  json.url player_url(player, format: :json)
end
