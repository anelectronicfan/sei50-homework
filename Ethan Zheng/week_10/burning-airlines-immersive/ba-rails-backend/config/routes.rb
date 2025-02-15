Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # API endpoints for AJAX-based frontend

  get '/flights' => 'flights#index'
  get '/flights/:id' => 'flights#show'

  get '/flights/search/:origin/:destination' => 'flights#search'
end
