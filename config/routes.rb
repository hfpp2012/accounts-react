Rails.application.routes.draw do
  resources :records
  root to: "records#index"
end
