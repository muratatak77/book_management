# frozen_string_literal: true

class CommentSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :post_id, :author, :post

  # def author
  #   {
  #     id: object.author.id,
  #     name: object.author.name,
  #     email: object.author.email,
  #     username: object.author.username,
  #   }
  # end

  # def post
  #   {
  #     id: object.author.id,
  #     title: object.post.title,
  #     content: object.post.content,
  #   }
  # end
end
