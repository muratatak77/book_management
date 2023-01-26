# frozen_string_literal: true

class BookSerializer < ActiveModel::Serializer
  attributes :id, :title, :page_size, :category, :author

  def author
    {
      id: object.author&.id,
      name: object.author&.name,
      email: object.author&.email
    }
  end
end
