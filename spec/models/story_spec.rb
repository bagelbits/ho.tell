# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Story, type: :model do
  describe ':random' do
    let!(:story1) { Story.create(story: 'This is a saucy story') }
    let!(:story2) { Story.create(story: 'This is a saucy story') }
    let!(:story3) { Story.create(story: 'This is a saucy story') }
    let(:stories) { [story1, story2, story3] }
    let!(:story_ids) { stories.map(&:id) }

    it 'selects a random story' do
      stories.map(&:review!)
      random_story = Story.random

      expect(story_ids).to include(random_story.id)
    end

    context 'with ignored_ids' do
      before do
        stories.map(&:review!)
      end

      it 'selects a random story' do
        random_story = Story.random([story1.id, story3.id])

        expect(random_story.id).to eq(story2.id)
      end

      context 'with string ids' do
        it 'still works' do
          5.times do
            random_story = Story.random([story1.id.to_s, story3.id.to_s])
            expect(random_story.id).to eq(story2.id)
          end
        end
      end
    end

    context 'with reported stories' do
      before do
        stories.map(&:review!)
      end

      it 'will not show them' do
        story1.report!
        story3.report!

        5.times do
          random_story = Story.random
          expect(random_story.id).to eq(story2.id)
        end
      end
    end

    context 'with non-reviewed stories' do
      it 'will not show them' do
        story2.review!

        5.times do
          random_story = Story.random
          expect(random_story.id).to eq(story2.id)
        end
      end
    end
  end

  describe ':reported' do
    let!(:story1) { Story.create(story: 'This is a saucy story') }
    let!(:story2) { Story.create(story: 'This is a saucy story') }
    let!(:story3) { Story.create(story: 'This is a saucy story') }
    let(:stories) { [story1, story2, story3] }
    let!(:story_ids) { stories.map(&:id) }
    let(:stories_to_report) { [story1, story3] }

    it 'shows reported stories' do
      stories_to_report.map(&:report!)

      expect(Story.reported).to eq(stories_to_report)
    end
  end

  describe ':to_review' do
    let!(:story1) { Story.create(story: 'This is a saucy story') }
    let!(:story2) { Story.create(story: 'This is a saucy story') }
    let!(:story3) { Story.create(story: 'This is a saucy story') }
    let(:stories) { [story1, story2, story3] }
    let!(:story_ids) { stories.map(&:id) }
    let(:stories_to_review) { [story1, story3] }

    it 'shows reported stories' do
      stories_to_review.map(&:review!)

      expect(Story.to_review).to eq([story2])
    end
  end

  describe '#review' do
    it 'marks story as reviewed' do
      story = Story.create(story: 'This is a saucy story')
      expect(story.reviewed).to eq(false)

      story.review!
      story = Story.find(story.id)
      expect(story.reviewed).to eq(true)
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
