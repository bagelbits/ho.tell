# frozen_string_literal: true

class AdminController < ApplicationController
  include HttpAuthConcern

  def index
    render component: 'Admin'
  end
end
