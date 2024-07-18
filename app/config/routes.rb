Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get "feeds", to: "feeds#index"
      post "feeds", to: "feeds#create"
      get "feeds/:id", to: "feeds#show"
      delete "feeds/:id", to: "feeds#destroy"
    end
  end
  get "homepage/index"
  root "homepage#index"
  get "/*path" => "homepage#index"
end
