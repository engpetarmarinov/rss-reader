FactoryBot.define do
  factory :post do
    title { "Sample Post #{rand(1000)}" }
    link { "http://example.com/#{rand(1000)}" }
    source { "Source #{rand(100)}" }
    source_url { "http://source.com/#{rand(100)}" }
    description { "Description #{rand(1000)}" }
  end
end
