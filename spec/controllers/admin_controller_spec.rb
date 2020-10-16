# frozen_string_literal: true

require 'rails_helper'

RSpec.describe AdminController, type: :controller do
  # TODO: Will have to setup login
  it 'renders the admin' do
    get :index
    expect(response.code).to eq('200')
  end
end
