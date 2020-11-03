class ReplaceReviewedWithApproved < ActiveRecord::Migration[6.0]
  def change
    add_column :stories, :approved, :boolean, default: false
    remove_column :stories, :reviewed, :boolean, default: false
  end
end
