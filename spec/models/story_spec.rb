# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Story, type: :model do
  describe '#report' do
    it 'marks prompt as reported' do
      prompt = Story.create(id: 2, story: 'This is a saucy story')
      expect(prompt.reported).to eq(false)

      prompt.report!
      prompt = Story.find(prompt.id)
      expect(prompt.reported).to eq(true)
    end
  end
end
