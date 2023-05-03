Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  # TODO 以下から
  # devise_for :users, controllers: {
  #   sessions: 'users/sessions'
  # }
  # root "home#index"
  # ここまで -- 不要?
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  namespace :api do
    # post 'auth/registrations'
    # get 'test/index'
    # resources :test, only: %i[index]3
    mount_devise_token_auth_for 'User', at: 'auth', controllers: {
      registrations: 'api/auth/registrations'
    }

    namespace :auth do
      resources :sessions, only: %i[index]
    end
  end
end
