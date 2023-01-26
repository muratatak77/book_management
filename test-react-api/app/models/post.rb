# frozen_string_literal: true

class Post < ApplicationRecord
  has_many :comments
  validates_presence_of :title
  validates_presence_of :content
end
