# frozen_string_literal: true

Rails.application.routes.draw do
  resources :stories do
    member do
      post 'report'
    end
  end

  root 'home#index'
end
