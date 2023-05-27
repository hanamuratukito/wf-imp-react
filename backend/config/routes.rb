Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  namespace :api do
    mount_devise_token_auth_for 'User', at: 'auth', controllers: {
      registrations: 'api/auth/registrations'
    }

    namespace :auth do
      resources :sessions, only: %i[index]
    end

    get '/gmail/getmail', to: 'gmail/gmail#getmail'
    get '/gmail/get_google_page', to: 'gmail/gmail#get_google_page'
    post '/gmail/add_request', to: 'gmail/gmail#add_request'
  end
end
