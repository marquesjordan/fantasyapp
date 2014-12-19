json.array!(@entries) do |entry|
  json.extract! entry, :id, :rank, :prize, :pg_id, :sg_id, :sf_id, :pf_id, :c_id, :fan_points
  json.url entry_url(entry, format: :json)
end
