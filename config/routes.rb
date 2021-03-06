Rails.application.routes.draw do
    resources :user
    get '/logout' => 'login#logout'
    root 'home#index'
    get 'home/index'
    get 'home/search' => 'home#search'   
    get 'home/category' => 'home#category'
    get '/login/index' => 'login#index'
    get '/login/user_exists' => 'login#user_exists'
    post '/login/authenticate' => 'login#authenticate'
    resources :product, :except => [:index]
end
