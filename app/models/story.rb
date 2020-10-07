# frozen_string_literal: true

class Story < ApplicationRecord
  validates :story, presence: true

  def report!
    self.reported = true
    save!
  end
end
