# frozen_string_literal: true

class AdminController < ApplicationController
  # TODO: Will have to setup login
  def index
    render component: 'admin/Index'
  end
end
