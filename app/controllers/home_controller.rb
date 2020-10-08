# frozen_string_literal: true

class HomeController < ApplicationController
  def index
    render component: 'App'
  end
end
