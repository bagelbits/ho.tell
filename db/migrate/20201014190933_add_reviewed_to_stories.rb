# frozen_string_literal: true

class AddReviewedToStories < ActiveRecord::Migration[6.0]
  def change
    add_column :stories, :reviewed, :boolean, default: false
  end
end
