# frozen_string_literal: true

class Author < ApplicationRecord
  validates :name, presence: true
  validates :email, presence: true

  has_many :books
  has_many :comments

  self.per_page = 10
end
