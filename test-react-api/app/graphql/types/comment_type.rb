module Types
  class CommentType < Types::BaseObject
    field :id, ID, null: false
    field :title, String, null: false
    field :author_id, Int, null: false
    field :post, PostType, null: false
    field :author, Types::AuthorType
  end
end