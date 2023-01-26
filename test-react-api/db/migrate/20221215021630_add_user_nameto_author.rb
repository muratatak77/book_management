# frozen_string_literal: true

class AddUserNametoAuthor < ActiveRecord::Migration[6.1]
  def change
    add_column :authors, :username, :string
  end
end
