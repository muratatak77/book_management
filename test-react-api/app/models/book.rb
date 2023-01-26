# frozen_string_literal: true

class Book < ApplicationRecord
  validates :title, presence: true
  validates :page_size, presence: true

  self.per_page = 5

  belongs_to :author, optional: true
end
