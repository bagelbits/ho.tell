# frozen_string_literal: true

require 'rails_helper'

RSpec.describe StoriesController, type: :controller do
  describe '#create' do
    it 'creates and links the storys' do
      post :create, params: { story: 'This is a saucy story' }

      last_story = Story.last
      expect(response.code).to eq('200')
      expect(JSON.parse(response.body)['id']).to eq(last_story.id)
    end

    context 'with missing story' do
      it 'fails' do
        expect do
          post :create, params: {}
        end.to raise_error(ActionController::ParameterMissing, 'param is missing or the value is empty: story')
      end
    end
  end

  describe '#report' do
    let(:story) { build(:story) }
    it 'marks story as reported' do
      allow(Story).to receive(:find).and_return(story)
      allow_any_instance_of(Story).to receive(:report!)

      expect(Story).to receive(:report!)
      post :report, params: { id: 2 }

      expect(response.code).to eq('200')
      expect(JSON.parse(response.body)['success']).to eq(true)
      expect(JSON.parse(response.body)['error']).to eq('')
    end
  end
end
