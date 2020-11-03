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

  describe '#random' do
    let(:story) { build(:story) }

    it 'gets a random story' do
      allow(Story).to receive(:random).and_return(story)

      expect(Story).to receive(:random)
      get :random

      expect(response.code).to eq('200')
      expect(JSON.parse(response.body)['id']).to eq(story.id)
    end

    context 'with ignoredIds param' do
      let(:ignored_ids) { '1,2,3' }
      it 'uses ignored ids' do
        allow(Story).to receive(:random).and_return(story)
        expect(Story).to receive(:random).with(ignored_ids.split(','))

        get :random, params: { ignored_ids: ignored_ids }

        expect(response.code).to eq('200')
        expect(JSON.parse(response.body)['id']).to eq(story.id)
      end
    end
  end

  describe '#to_review' do
    it 'calls Story.to_review' do
      allow(Story).to  receive(:to_review).and_return({})
      expect(Story).to receive(:to_review)
      get :to_review

      expect(response.code).to eq('200')
    end
  end

  describe '#approved' do
    it 'calls Story.approved' do
      allow(Story).to  receive(:approved).and_return({})
      expect(Story).to receive(:approved)
      get :approved

      expect(response.code).to eq('200')
    end
  end

  describe '#reported' do
    it 'calls Story.reported' do
      allow(Story).to  receive(:reported).and_return({})
      expect(Story).to receive(:reported)
      get :reported

      expect(response.code).to eq('200')
    end
  end

  describe '#report' do
    let(:story) { build(:story) }
    it 'marks story as reported' do
      allow(Story).to receive(:find).and_return(story)
      allow_any_instance_of(Story).to receive(:report!)

      expect(story).to receive(:report!)
      post :report, params: { id: 2 }

      expect(response.code).to eq('200')
      expect(JSON.parse(response.body)['success']).to eq(true)
      expect(JSON.parse(response.body)['error']).to eq('')
    end
  end

  describe '#approve' do
    let(:story) { build(:story) }
    it 'marks story as approveed' do
      allow(Story).to receive(:find).and_return(story)
      allow_any_instance_of(Story).to receive(:approve!)

      expect(story).to receive(:approve!)
      post :approve, params: { id: 2 }

      expect(response.code).to eq('200')
      expect(JSON.parse(response.body)['success']).to eq(true)
      expect(JSON.parse(response.body)['error']).to eq('')
    end
  end
end
