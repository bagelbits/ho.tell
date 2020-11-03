# frozen_string_literal: true

require 'rails_helper'
require 'support/auth_helper'

RSpec.describe AdminController, type: :controller do
  render_views
  include AuthHelper

  context 'with correct user/pass' do
    before(:each) do
      http_login
    end
    it 'renders the admin' do
      get :index
      expect(response.code).to eq('200')
    end
  end

  context 'with incorrect user/pass' do
    before(:each) do
      bad_http_login
    end

    it 'should fail' do
      get :index
      expect(response.code).to eq('401')
      expect(response.body).to eq("HTTP Basic: Access denied.\n")
    end
  end
end
