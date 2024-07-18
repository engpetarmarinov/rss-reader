Rails.application.routes.draw do
  get "homepage/index"
  root "homepage#index"
  get "/*path" => "homepage#index"
end
