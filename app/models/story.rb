# frozen_string_literal: true

class Story < ApplicationRecord
  class << self
    def random(ignored_ids = [])
      results = if ignored_ids.present?
                  where.not(id: ignored_ids)
                else
                  all
                end
      results.where(reported: false, approved: true).order(Arel.sql('RAND()')).first
    end
  end

  validates :story, presence: true

  scope :to_review, -> { where(reported: false, approved: false) }
  scope :approved, -> { where(reported: false, approved: true) }
  scope :reported, -> { where(reported: true) }

  def approve!
    self.approved = true
    self.reported = false
    save!
  end

  def report!
    self.reported = true
    self.approved = false
    save!
  end
end
