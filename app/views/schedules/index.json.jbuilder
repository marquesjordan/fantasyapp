json.array!(@schedules) do |schedule|
  json.extract! schedule, :id, :home_team_id, :away_team_id, :date_string
  json.url schedule_url(schedule, format: :json)
end
