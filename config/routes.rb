# frozen_string_literal: true

Rails.application.routes.draw do
  get 'admin', to: 'admin#index'

  resources :stories do
    collection do
      get 'random'
      get 'to_review'
      get 'reviewed'
      get 'reported'
    end

    member do
      post 'report'
      post 'review'
    end
  end

  root 'home#index'
end
