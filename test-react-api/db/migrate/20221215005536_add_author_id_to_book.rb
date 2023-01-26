# frozen_string_literal: true

class AddAuthorIdToBook < ActiveRecord::Migration[6.1]
  def change
    add_column :books, :author_id, :integer
  end
  add_index :books, :author_id
end
