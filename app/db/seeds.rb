# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

Feed.create(
  name: 'Golang Weekly',
  url: 'https://cprss.s3.amazonaws.com/golangweekly.com.xml',
  image: 'https://golangweekly.com/images/gopher-keith-57.png'
)

Feed.create(
  name: 'Twit Tech Audio',
  url: 'https://feeds.twit.tv/twit.xml',
  image: 'https://twit.tv/TWiT-iOS-1024x1024.png'
)
