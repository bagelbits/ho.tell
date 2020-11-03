# frozen_string_literal: true

Rails.application.routes.draw do
  get 'admin', to: 'admin#index'

  resources :stories do
    collection do
      get 'random'
      get 'to_review'
      get 'approved'
      get 'reported'
    end

    member do
      post 'report'
      post 'approve'
    end
  end

  root 'home#index'
end
