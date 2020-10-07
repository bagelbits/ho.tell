# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Story, type: :model do
  describe ':random' do
    let!(:story1) { Story.create(story: 'This is a saucy story') }
    let!(:story2) { Story.create(story: 'This is a saucy story') }
    let!(:story3) { Story.create(story: 'This is a saucy story') }
    let!(:story_ids) { [story1, story2, story3].map(&:id) }

    it 'selects a random story' do
      random_story = Story.random

      expect(story_ids).to include(random_story.id)
    end

    context 'with ignored_ids' do
      it 'selects a random story' do
        random_story = Story.random([story1.id, story3.id])

        expect(random_story.id).to eq(story2.id)
      end

      context 'with string ids' do
        it 'still works' do
          random_story = Story.random([story1.id.to_s, story3.id.to_s])

          expect(random_story.id).to eq(story2.id)
        end
      end
    end
  end

  describe '#report' do
    it 'marks story as reported' do
      story = Story.create(story: 'This is a saucy story')
      expect(story.reported).to eq(false)

      story.report!
      story = Story.find(story.id)
      expect(story.reported).to eq(true)
    end
  end
end
