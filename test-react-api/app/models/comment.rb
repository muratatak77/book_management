# frozen_string_literal: true

class Comment < ApplicationRecord
  belongs_to :post, class_name: 'Post', optional: true
  belongs_to :author, class_name: 'Author', optional: true

  validates :title, presence: true
  validates :content, presence: true
end
