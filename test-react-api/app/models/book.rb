class Book < ApplicationRecord

  validates :title, presence: true
  validates :page_size, presence: true

  self.per_page = 4
end
