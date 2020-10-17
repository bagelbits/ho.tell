# frozen_string_literal: true

Rails.application.routes.draw do
  resources :stories do
    collection do
      get 'random'
    end

    member do
      post 'report'
    end
  end

  root 'home#index'
end
