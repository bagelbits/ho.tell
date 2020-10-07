# frozen_string_literal: true

class CreateStories < ActiveRecord::Migration[6.0]
  def change
    create_table :stories do |t|
      t.text :story, null: false
      t.boolean :reported, default: false

      t.timestamps
    end
  end
end
