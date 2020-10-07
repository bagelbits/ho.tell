# frozen_string_literal: true

FactoryBot.define do
  factory :story do
    story { 'This is a saucy story.' }
    reported { false }
  end
end
