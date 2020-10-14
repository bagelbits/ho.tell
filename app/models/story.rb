# frozen_string_literal: true

class Story < ApplicationRecord
  class << self
    def random(ignored_ids = [])
      results = if ignored_ids.present?
                  where.not(id: ignored_ids)
                else
                  all
                end
      results.where(reported: false, reviewed: true).order(Arel.sql('RAND()')).first
    end
  end

  validates :story, presence: true

  scope :reported, -> { where(reported: true) }
  scope :to_review, -> { where(reviewed: false) }

  def review!
    self.reviewed = true
    save!
  end

  def report!
    self.reported = true
    save!
  end
end
