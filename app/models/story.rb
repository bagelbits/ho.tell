# frozen_string_literal: true

class Story < ApplicationRecord
  class << self
    def random(ignored_ids = [])
      results = if ignored_ids.present?
                  where.not(id: ignored_ids)
                else
                  all
                end
      results.order(Arel.sql('RAND()')).first
    end
  end

  validates :story, presence: true

  def report!
    self.reported = true
    save!
  end
end
