Rails.application.routes.draw do
  resources :books
  get 'categories', to: 'books#category_list'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
