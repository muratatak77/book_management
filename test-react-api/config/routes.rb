# frozen_string_literal: true

Rails.application.routes.draw do

  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "graphql#execute"
  end

  post "/graphql", to: "graphql#execute"
  root to: "main#index"
  
  resources :comments
  resources :posts
  resources :books
  get 'categories', to: 'books#category_list'
  get 'users_comments', to: 'comments#users_comments'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
