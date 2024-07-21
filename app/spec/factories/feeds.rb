FactoryBot.define do
  factory :feed do
    name { "Sample Feed" }
    url { "http://example.com/feed" }
    image { "http://example.com/image.png" }
  end
end
